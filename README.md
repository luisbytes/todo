# Luisbytes To-Do App

This is a simple To-Do application built using Ionic/Angular/Cordova. It allows users to add and delete tasks from their to-do list.

## Features

- Sqlite database for local storage
- Remote Config for enabled or disable add category feature

## Prerequisites

Before you can run the application, make sure you have the following installed on your machine:

- Node.js (https://nodejs.org/)
- Ionic CLI (https://ionicframework.com/docs/cli)
- Cordova CLI (https://cordova.apache.org/docs/en/latest/guide/cli/index.html
- Android Studio (for Android development) or Xcode (for iOS development)
- A compatible mobile device or emulator for testing

## Installation

1. Install the dependencies:

```bash
npm install
```
1. Adds the platforms you want to develop for:

```bash
ionic cordova platform add android
ionic cordova platform add ios
```

3. Prepare the application for development:

```bash
ionic cordova prepare
```

## Running the Application

To run the application use the following command:

### For Android:
```bash
npm run start:android
```

### For iOS:
```bash
npm run start:ios
```

## Building

To build the application for production, use the following command:

### For Android:
```bash
npm run build:android
```

## For iOS:
```bash
npm run build:ios
```
