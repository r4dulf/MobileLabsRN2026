# Лабораторна робота №6 — Firebase Auth + Firestore

Мобільний застосунок з авторизацією через Firebase Authentication та збереженням профілю користувача у Firestore.

## Реалізований функціонал

- Реєстрація / вхід / вихід через Firebase Authentication (email + пароль)
- Заповнення та редагування профілю (ім'я, вік, місто) — зберігається у Firestore
- Захист маршрутів: неавторизований користувач перенаправляється на `/login`
- Відновлення паролю через email (Firebase)
- Видалення акаунту з повторною автентифікацією перед видаленням

## Налаштування Firebase

### 1. Створити проєкт

1. Перейди на [Firebase Console](https://console.firebase.google.com) і створи новий проєкт
2. У розділі **Authentication → Sign-in method** увімкни **Email/Password**
3. У розділі **Firestore Database** створи базу даних (режим test або production)

### 2. Отримати конфігурацію

1. ⚙️ Налаштування проєкту → вкладка **Загальні**
2. Прокрути вниз до **"Ваші застосунки"** → додай веб-застосунок (`</>`)
3. Скопіюй об'єкт `firebaseConfig`

### 3. Створити файл `.env`

Скопіюй `.env.example` у `.env` і заповни значеннями з `firebaseConfig`:

```bash
cp .env.example .env
```

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 4. Firestore Security Rules

У Firebase Console → **Firestore → Rules** встанови:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Запуск

```bash
npm install
npx expo start
```

Відскануй QR-код у застосунку **Expo Go** або запусти у емуляторі.
