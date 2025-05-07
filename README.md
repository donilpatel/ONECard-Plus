# OneCard Plus 🎓💳  

Welcome to **OneCard Plus**—the ultimate app for managing your student ID card with ease!

Created by students at Wilfrid Laurier University, this student-focused mobile application is designed to simplify access to OneCard information. Say goodbye to the outdated and cumbersome website ([onecard.wlu.ca](https://onecard.wlu.ca/OneWeb/Account/LogOn)) and hello to a sleek, intuitive interface tailored for modern student life.

Whether you're a first-year student navigating campus for the first time or a seasoned upper-year looking for a hassle-free way to manage your funds, OneCard Plus has you covered. With its modern design and user-friendly features, you can:

- **Track balances**: Always know how much you have left on your OneCard.
- **View transactions**: Stay on top of your spending history.
- **Manage funds on the go**: Add and manage your money anytime, anywhere.

OneCard Plus is built with students in mind, ensuring an efficient and stress-free student experience. Simplify your student life today with OneCard Plus!

This app is built using the [Expo](https://expo.dev) framework and follows modern development practices to ensure a smooth user experience.

---

## Features

1. **Authentication**: A secure login system is used to access OneCard information.
2. **Balance Inquiry**: Easily check your remaining OneCard balance at any time, including:
   - Viewing balances for multiple categories (e.g., meal plans, flex dollars, etc.).
   - Downloading and generating detailed reports of all balances.
3. **Transaction History**: Access a detailed view of your recent transactions.
4. **Funds Management**: Manage your OneCard funds with ease.
---

## Technical Features

1. **Navigation**: Seamless navigation between screens using `MainTabs` and `AppNavigation`.
2. **Reusable UI Components**: Includes components like `Collapsible`, `HapticTab`, and `ParallaxScrollView` for a rich user interface.
3. **Custom Theming**: Support for theming with `useThemeColor`, `ThemedText`, and `ThemedView`.

---

## Team Members

- [Donil Patel](https://www.linkedin.com/in/donil-patel-02680125b/)
- [Ali Ahmed](https://www.linkedin.com/in/ali-mujtaba-ahmed/)
- [Rafae Hashmi](https://www.linkedin.com/in/syed-rafae-hashmi/)
- [Abrar Murad](https://www.linkedin.com/in/abrar-murad/)

---

## Getting Started

Follow these steps to set up and run the project locally:

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd onecard_plus-main/rpi-main
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

1. Start the development server:
   ```bash
   npx expo start
   ```

2. Use one of the following options to open the app:
   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go)

---

## Project Structure

- **app/**: Contains the main application code and screens, including:
  - `FundsScreen`
  - `MainScreen`
  - `TransactionsScreen`
  - `SignInScreen`
- **components/**: Reusable UI components such as `Collapsible`, `ParallaxScrollView`, and `HapticTab`.
- **assets/**: Static assets such as images and fonts.
- **context/**: Context API implementations for authentication and state management.
- **navigation/**: Handles navigation logic between screens.

---

## Contributing

We welcome contributions to improve OneCard Plus! Feel free to submit pull requests or report issues in the repository.

---

## License

This project is licensed under the MIT License.

---

## Learn More

To learn more about Expo and app development, visit the following resources:

- [Expo Documentation](https://docs.expo.dev/)
- [Learn Expo Tutorial](https://docs.expo.dev/tutorial/introduction/)
- [Expo GitHub Repository](https://github.com/expo/expo)
