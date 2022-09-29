/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
//# Basic Deploy: Upload everything in /dist straight to S3

// Configuration Constants
const AWS_PROFILE = "docs-deployer"; // references ~/.aws/credentials
const TARGET_BUCKET = 'docs.paperize.io'; // S3 bucket name
const CLOUDFRONT_DISTRIBUTION_ID = "E1G7A2XX5SSZTS";
const DIRECTORY_TO_DEPLOY = "dist"; // local directory containing static files

// Utils
const _ = require("lodash");

// Setup AWS
process.env.AWS_PROFILE = AWS_PROFILE;
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const cloudfront = new AWS.CloudFront();

// Filesystem stuff
const mimeTypes = require("mime-types");
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require("fs"));
const recursiveReaddir = require("recursive-readdir");

// For all files in deploy dir
recursiveReaddir(`./${DIRECTORY_TO_DEPLOY}`).then(function(files) {
  const itemCount = files.length;
  // Strip the deploy dir from the path
  files = files.map(file => file.replace(`${DIRECTORY_TO_DEPLOY}/`, ""));
  // Start uploading in parallel
  console.log(`Uploading ${itemCount} files...`);
  return Promise.map(files, uploadFileToS3, {concurrency: 10})

  .then(function() {
    console.log("Invalidating CloudFront cache...");
    return cloudfront.createInvalidation({
      DistributionId: CLOUDFRONT_DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: String(Date.now()),
        Paths: {
          Quantity: 1,
          Items: [ '/*' ]
        }
      }})
    .promise();}).then(() => console.log("Done."));
});

var uploadFileToS3 = function(file) {
  const mimeType = mimeTypes.lookup(file) || 'application/octet-stream';

  return s3.putObject({
    Bucket: TARGET_BUCKET,
    Key:    file,
    Body:   fs.createReadStream(`./${DIRECTORY_TO_DEPLOY}/${file}`),
    ACL:    'public-read',
    ContentDisposition: 'inline',
    ContentType: mimeType

  }).promise()

  .then(() => console.log(`Uploaded ${file}, ${mimeType}`)).catch(function(error) {
    console.log(error);
    throw error;
  });
};
