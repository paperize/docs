---
slug: google-drive
title: Google Drive Integration
---

# Google Drive Integration

Paperize uses Google Drive as its backend for files and data. This means that to use Paperize you will need a Google account. (It might become possible to use other backends in the future, but for now Google Drive is it.)

Some notes on what Paperize can, cannot and does not do with your data:

* Paperize can manage any files added by or through the application.
* Paperize _can not_ touch Google Drive files not added by or through the application.
* Paperize _does not_ send or store your data anywhere else, just on Google Drive.

When you start Paperize and give it permission to use Google Drive, it creates a root folder on your drive named Paperize.io. The folder may be moved and even renamed, if you so wish. In the folder you will find the file `paperize_database.json`, containing the database for your projects.

When creating new games, Paperize by default creates a new folder for the game, with a spreadsheet for component data and a sub folder for images. It is possible to instead use spreadsheets and images created for other games, but the spreadsheets and images _must_ be created by/uploaded through Paperize – Paperize cannot access spreadsheets created elsewhere, nor images uploaded in the usual way to Google Drive. If you wish to reuse data you have in a spreadsheet not created by Paperize, you will have to either copy cell content, [copy entire tabs](https://help.tillerhq.com/en/articles/2844735-how-to-copy-a-sheet-tab-to-another-google-sheet) or use [dynamic import of data](https://support.google.com/a/users/answer/9308940?hl=en). If you copy entire tabs/sheets from another workbook, you will have to tell Paperize which sheet to read data from at the game editor.
