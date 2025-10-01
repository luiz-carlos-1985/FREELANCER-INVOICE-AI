# Freelancer Invoice

A modern, professional SaaS invoice generator built with Next.js and TypeScript. Create beautiful invoices in seconds with an intuitive step-by-step interface and flexible pricing plans.

## Features

### 🎨 Professional Design
- Modern glassmorphism UI with gradient backgrounds
- Responsive design that works on all devices
- Clean, professional invoice layout
- Print-optimized PDF generation

### 📋 Smart Form Validation
- Real-time field validation
- Required field indicators
- Email format validation
- Numeric input validation for quantities and rates

### 🏢 Business Features
- Company logo upload support
- Multiple invoice items with automatic calculations
- Tax calculation (10% default)
- Due date setting
- Custom notes section
- Unique invoice numbering

### 📄 PDF Export
- One-click PDF generation
- Professional print layout
- Optimized for A4 paper size
- Company logo included in PDF

### 🔐 Authentication & SaaS
- User login and registration system
- Multiple pricing tiers (Free, Pro, Business)
- 7-day free trial for Pro plan
- Usage tracking and limits
- Subscription management

### 💰 Pricing Plans
- **Free**: 3 invoices/month, basic features
- **Pro**: 50 invoices/month, custom logo, priority support
- **Business**: Unlimited invoices, team collaboration, API access

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd freelancer-invoice-ai
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3002](http://localhost:3002) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run dev:nodemon` - Start with nodemon for auto-restart
- `npm run build` - Build for production
- `npm run start` - Start production server

## Usage

### Getting Started
1. **Sign Up/Login**: Create an account or login with any email/password (demo mode)
2. **Choose Plan**: Start with Free plan or begin 7-day Pro trial
3. **Create Invoice**: Follow the 3-step process below

### Step 1: Client & Freelancer Information
- Enter client details (name, email, address)
- Add your business information
- Upload company logo (Pro+ feature)
- All fields are validated in real-time

### Step 2: Services & Items
- Add invoice items with descriptions
- Set quantities and rates
- View automatic amount calculations
- Add due date and notes
- Real-time total calculation with tax

### Step 3: Review & Generate
- Preview your professional invoice
- Download as PDF with one click (requires login)
- Print-optimized layout
- Usage tracking based on your plan

## Project Structure

```
freelancer-invoice-ai/
├── pages/
│   ├── _app.tsx          # App configuration with favicon
│   └── index.tsx         # Main SaaS invoice generator
├── globals.css           # Global styles and Tailwind
├── favicon.svg           # SVG favicon with brand colors
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── tsconfig.json         # TypeScript configuration
├── .gitignore           # Git ignore rules
└── package.json          # Dependencies and scripts
```

## SaaS Features

### Authentication
- Simple email/password login (demo mode)
- User session management
- Logout functionality
- Protected PDF generation

### Subscription Management
- Free tier with 3 invoices/month
- Pro trial (7 days) with 50 invoices/month
- Business plan with unlimited invoices
- Usage tracking and limit enforcement

### Premium Features
- Company logo upload (Pro+)
- Priority support (Pro+)
- Team collaboration (Business)
- API access (Business)
- White-label options (Business)

## Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom components:
- `.glass-purple` - Glassmorphism effect
- `.form-input` - Styled form inputs
- `.btn-generate` - Gradient buttons

### Print Styles
Optimized CSS for PDF generation with:
- A4 page size configuration
- Proper margins and spacing
- Hidden elements for print (`no-print` class)

## Customization

### Tax Rate
Default tax rate is 10%. To change it, modify the calculation in the `calculateTotals` function:

```typescript
const tax = subtotal * 0.1 // Change 0.1 to your desired rate
```

### Pricing Plans
Modify the `plans` array in `pages/index.tsx` to adjust:
- Plan names and prices
- Invoice limits per plan
- Feature lists
- Trial duration

### Styling
Customize colors and design by modifying:
- `tailwind.config.js` for theme colors
- `globals.css` for custom components
- Component classes in `pages/index.tsx`
- `favicon.svg` for brand icon

### Authentication
The current implementation uses demo authentication. For production:
- Replace `handleLogin` with real authentication
- Add password hashing and validation
- Implement proper session management
- Add password reset functionality

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Demo Credentials

For testing purposes, you can login with any email and password combination. The system will automatically create a demo user account.

**Example:**
- Email: `demo@example.com`
- Password: `password123`

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
```bash
npm run build
npm run start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support or questions, please open an issue in the repository.

## Roadmap

- [ ] Real authentication with database
- [ ] Payment integration (Stripe)
- [ ] Email invoice delivery
- [ ] Invoice templates
- [ ] Multi-language support
- [ ] Team collaboration features
- [ ] API for developers
- [ ] Mobile app

## Screenshots:

<img width="1080" height="1047" alt="image" src="https://github.com/user-attachments/assets/0281729e-601a-4d1f-b513-a69f5f331885" />

<img width="1113" height="991" alt="image" src="https://github.com/user-attachments/assets/0d24ff37-f75c-4d06-bb72-e00b607aa40a" />

<img width="1049" height="1043" alt="image" src="https://github.com/user-attachments/assets/65b68a81-9fb2-4fd2-bd2a-3cbf2904123c" />

<img width="1496" height="644" alt="image" src="https://github.com/user-attachments/assets/ff134b8a-5fbc-4e3b-950c-72332db61901" />

<img width="1536" height="1044" alt="image" src="https://github.com/user-attachments/assets/de0a45a5-4a3e-441d-91b2-890f11e3e9e9" />




