# VocabJoy - Ứng dụng học từ vựng tiếng anh theo phương pháp học gián đoan.

# Folder structure:

    VocabJoy
    |___Mobile
    |    |__...
    |
    |___Backend
        |_...

    
```
# Với Mobile
mobile/
├── app/                        #For layout and screen, that can routing
│   ├── (tabs)/
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   ├── posts.tsx
│   │   └── _layout.tsx
│   ├── +html.tsx
│   ├── +not-found.tsx
│   └── _layout.tsx
├── assets/                    #image, font, icon,...
│   ├── images/
│   │   ├── logo.png
│   │   ├── Pattern.png
│   │   ├── adaptive-icon.png
│   │   └── splash.png
│   └── fonts/
│       ├── Inter-VariableFont_opsz,wght.ttf
│       └── SpaceMono-Regular.ttf
├── components/                                #Component for layout, input, button, bottom bar,...
│   ├── button.tsx
│   ├── logo-with-name.tsx
│   ├── ParallaxScrollView.tsx
│   ├── form/
│   │   ├── login-form.tsx
│   │   └── sign-up-form.tsx
│   └── navigation/
│       └── tab-bar-icon.tsx
├── constants/                                #Some constants use for all project
│   └── colors.ts
├── lib/                                        #Redux, API, Redux Slice
│   ├── features/
│   │   ├── api/
│   │   │   └── api-slice.ts
│   │   ├── counter/
│   │   │   └── counter-slice.ts
│   │   └── todos/
│   │       └── todos-slice.ts
│   ├── hook.ts
│   └── store.ts
├── schemas/                                #Schema for Validation
│   ├── login.ts
│   └── sign-up.ts
├── scripts/
│   └── reset-project.js
├── .gitignore
├── app.json
├── babel.config.js
├── metro.config.js
├── package.json
└── tsconfig.json
```

Hello
