# Articles Feature

## Overview

The Articles feature provides a minimalist, ultra-lightweight way to display PDF content on the BJJ Skill Matrix website. It's inspired by the design philosophy of:
- [thebestmotherfucking.website](https://thebestmotherfucking.website/)
- [bettermotherfuckingwebsite.com](http://bettermotherfuckingwebsite.com/)

## Features

### Navigation
- **Create Node**: Opens the node creation interface on the matrix
- **Articles**: Navigate to the Articles landing page
- **Help**: Opens the help dialog

### Articles Page
- Ultra-lightweight, minimalist design
- Responsive layout that works on all devices
- Clean typography using Georgia serif font
- Simple navigation with "Back to Matrix" button
- Placeholder content based on the PDF "Coaching Advice for Grappling Athletes"

## File Structure

```
src/
├── components/
│   ├── Articles.tsx          # Main Articles component
│   └── Header.tsx            # Updated with Articles navigation
├── assets/
│   └── Coaching Advice for Grappling Athletes_ Wrestling, Judo, and BJJ.pdf
└── App.tsx                   # Updated with routing logic

scripts/
└── extractPdfText.js         # PDF text extraction utility
```

## Usage

### Current Implementation
The Articles component currently displays placeholder content that represents the structure and content of the PDF. The content includes:

- Introduction to grappling coaching
- Core principles (Position Before Submission, Pressure and Control, Technique Over Strength)
- Wrestling fundamentals
- Judo principles
- BJJ strategy
- Mental preparation
- Physical conditioning
- Technical development
- Competition strategy
- Recovery and injury prevention
- Long-term development

### Future PDF Integration
To display actual PDF content:

1. Install PDF parsing library:
   ```bash
   npm install pdf-parse
   ```

2. Run the extraction script:
   ```bash
   node scripts/extractPdfText.js
   ```

3. Update the Articles component to import and display the extracted text

## Design Philosophy

### Ultra-Lightweight
- Minimal CSS and styling
- No heavy frameworks or libraries
- Fast loading and rendering
- Clean, readable typography

### Minimalist
- Simple color scheme (black text on white background)
- Clean typography with Georgia serif font
- Generous whitespace and line spacing
- Focus on content over decoration

### Responsive
- Works on desktop, tablet, and mobile
- Flexible layout that adapts to screen size
- Readable text at all viewport sizes

## Navigation Flow

1. **Matrix View**: Default view with scatter plot and sidebar
2. **Articles View**: Click "Articles" button to navigate
3. **Back Navigation**: Click "← Back to Matrix" to return

## Technical Implementation

### State Management
- `currentView` state in App.tsx controls which view is displayed
- Conditional rendering of sidebar and main content
- Clean separation between matrix and articles views

### Component Structure
- `Articles.tsx`: Self-contained component with inline styles
- `Header.tsx`: Updated with Articles navigation button
- `App.tsx`: Handles routing and view switching

### Styling
- Inline styles for maximum compatibility
- No external CSS dependencies
- Consistent with the minimalist design philosophy

## Future Enhancements

1. **PDF Text Extraction**: Implement actual PDF parsing
2. **Multiple Articles**: Support for multiple PDF files
3. **Search Functionality**: Add search within articles
4. **Table of Contents**: Auto-generate TOC from headings
5. **Print Styles**: Optimize for printing
6. **Dark Mode**: Add dark theme option

## Development Notes

- The Articles component uses inline styles to avoid CSS framework dependencies
- Content is currently hardcoded but structured for easy replacement with extracted PDF text
- Navigation is handled through React state rather than URL routing for simplicity
- The design prioritizes readability and performance over visual complexity 