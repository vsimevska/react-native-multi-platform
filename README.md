# React Native Cross-Platform App Setup and Running Guide

This guide will help you set up and run the React Native app on macOS and Windows platforms.

---

### Platform-Specific Requirements:

#### For Windows:
- To check or install Windows dependencies run this command in an elevated PowerShell window

```bash
Set-ExecutionPolicy Unrestricted -Scope Process -Force;
iex (New-Object System.Net.WebClient).DownloadString('https://aka.ms/rnw-vs2022-deps.ps1');

```

#### For macOS:
- [Xcode](https://developer.apple.com/xcode/):
  - Install Xcode from the App Store or via Apple Developer portal.
  - Install Command Line Tools
 - [CocoaPods](https://cocoapods.org/):
  ```bash
  sudo gem install cocoapods
  ```

---

## Project Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   yarn install
   # or
   npm install
   ```

4. For **macOS:** navigate to the `macos` directory and install dependencies using CocoaPods:
     ```bash
     cd macos
     pod install
     cd ..
     ```

---

## Running the App

### On Windows:
   ```bash
npx react-native run-windows
   ```

### On macOS:
1. Start Metro bundler:
   ```bash
   npx react-native start
   ```

2. Launch the app:
   ```bash
npx react-native run-macos
   ```
