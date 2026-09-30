# AI FAQ Assistant API

AI-powered FAQ and customer support automation. A secure REST API built with
Node.js, Express.js, MongoDB (Mongoose), JWT authentication, bcrypt password
hashing, and Google Gemini AI for automated FAQ generation.

For Note that if you actually like to run my project use npm install command to install the dependencies as i cannot upload 4653files into github as the node_modules folder under my project folder


## 1. Software Requirements
- Node.js v18+
- npm v9+
- MongoDB (local or Atlas)
- Postman / ThunderClient for API testing
- VS Code (or similar)

## 2. Hardware Requirements
- Intel Core i5 (8th Gen+) / AMD Ryzen 5 or equivalent
- 8 GB RAM minimum (16 GB recommended)
- 1 GB free disk space

## Project Structure
```
FAQ/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── authController.js
│   │   └── faqController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── FAQ.js
│   │   └── User.js
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   └── faqRoutes.js
│   ├── services/
│   │   └── geminiService.js
│   ├── utils/
│   │   └── helpers.js
│   ├── app.js
│   └── server.js
├── .env.example
├── package.json
└── README.md
```

## Setup

```bash
npm install
cp .env.example .env   # then fill in MONGO_URI, JWT_SECRET, GEMINI_API_KEY
npm run dev             # starts on http://localhost:5000
```

## API Endpoints

### Auth (`/api/auth`)
| Method | Route | Access | Body |
|---|---|---|---|
| POST | `/api/auth/register` | Public | `{ name, email, password }` |
| POST | `/api/auth/login` | Public | `{ email, password }` |
| GET | `/api/auth/profile` | Private | Bearer token |

### FAQs (`/api/faqs`)
| Method | Route | Access | Body |
|---|---|---|---|
| GET | `/api/faqs` | Public | — |
| GET | `/api/faqs/:id` | Public | — |
| GET | `/api/faqs/search?q=keyword` | Public | — |
| POST | `/api/faqs` | Private | `{ question, answer, category }` |
| PUT | `/api/faqs/:id` | Private (owner/admin) | any of the above fields |
| DELETE | `/api/faqs/:id` | Private (owner/admin) | — |

### AI (`/api/ai`)
| Method | Route | Access | Body |
|---|---|---|---|
| POST | `/api/ai/answer` | Private | `{ question }` |
| POST | `/api/ai/generate-faq` | Private | `{ topic }` |

## Roles
- **Admin** – manage all users/FAQs/categories, full system access.
- **Creator** – create/edit/delete own FAQs, generate FAQs with AI.
- **User** – view/search public FAQs, generate AI-assisted answers, view own profile.
- **Public** – view and search published FAQs only.

## Key Features
- JWT authentication & role-based authorization
- AI FAQ generation via Google Gemini
- Keyword search across FAQs
- Full CRUD for FAQs with ownership checks
- bcrypt password hashing
- Centralized error handling & express-validator schema validation
