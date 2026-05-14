Create a full-stack modern AI-powered web application called “FutureBond AI”.

The website predicts:

* likely marriage age range
* likely number of children
* relationship personality type
* relationship timeline insights

based on a questionnaire and AI-generated analysis.

IMPORTANT:
This is NOT a fortune-telling website.
The platform should be positioned as:
“AI-powered relationship insights based on lifestyle patterns, personality traits, and demographic-style correlations.”

TECH STACK:
Frontend:

* React + Vite
* Tailwind CSS
* Framer Motion animations

Backend:

* Node.js + Express

Database:

* MongoDB with Mongoose

AI:

* Google Gemini API using @google/genai

DESIGN REQUIREMENTS:

* modern dark UI
* premium startup feel
* smooth animations
* glassmorphism cards
* responsive mobile-first design
* attractive gradient backgrounds
* professional typography
* visually similar quality to modern AI startups

PAGES:

1. Landing Page
   Include:

* hero section
* “Start Prediction” CTA button
* feature cards
* how it works section
* testimonials section
* futuristic animated background
* footer

2. Questionnaire Page
   Create a beautiful multi-step form with progress bar.

Questions should include:

* age
* gender
* country
* education level
* introvert/extrovert
* career priority
* relationship goals
* desire for children
* social activity level
* family importance
* lifestyle preferences
* long-term commitment preference

Use:

* cards
* animated transitions
* modern radio/select components

3. Result Page
   Generate:

* predicted marriage age range
* predicted children range
* personality archetype
* relationship analysis
* future relationship timeline
* compatibility style
* confidence meter

Display:

* animated charts
* glowing cards
* progress indicators
* share result button
* download result image button

BACKEND LOGIC:

Create a scoring-based prediction engine.

Example categories:

* family score
* career score
* social score
* stability score

Use weighted logic to generate:

* marriage age range
* child count range
* personality archetype

Do NOT use random predictions.

GEMINI AI INTEGRATION:

Use Gemini API only for generating:

* personalized relationship analysis
* personality explanation
* future timeline narrative

The backend should:

1. calculate prediction values
2. send structured prompt to Gemini
3. return AI-generated explanation

Create clean prompt engineering for Gemini.

Example:
“Generate an engaging but realistic relationship insight analysis based on these calculated traits.”

IMPORTANT:
Avoid claiming certainty about the future.
Use wording like:

* “people with similar traits often…”
* “your answers suggest…”
* “statistically similar profiles tend to…”

DATABASE REQUIREMENTS:

Use MongoDB Atlas.

Create Mongoose models for:

1. UserSession

* questionnaire answers
* calculated scores
* generated predictions
* AI analysis
* createdAt timestamp

2. Analytics

* total users
* most common prediction ranges
* average marriage age prediction
* average children prediction

3. ShareResults

* share image URL
* prediction summary
* createdAt

Implement:

* MongoDB connection setup
* environment variables
* schema validation
* indexes for performance
* proper async/await error handling

FEATURES:

* shareable result card
* downloadable social media image
* loading animation while AI generates result
* session persistence
* API error handling
* clean folder structure
* reusable React components
* environment variables setup

EXTRA:

* create attractive mock data
* include comments in important files
* create README with setup instructions
* make the project production-ready
* use best practices
* make the code beginner-friendly but scalable

PROJECT STRUCTURE:
Create:

* frontend/
* backend/

Backend structure should include:

* models/
* routes/
* controllers/
* services/
* utils/
* middleware/
* config/

Frontend structure should include:

* pages/
* components/
* layouts/
* hooks/
* services/
* animations/
* context/

OUTPUT:
Generate the complete project structure and all required code files.

Use modern best practices and clean architecture.
