# About Page - Required Images

The About page requires the following placeholder images to be added to the `/public` directory:

## Logo Images (for testimonial section)

- `/logo-icon.svg` - Company logo icon (30x31px)
- `/logo-text.svg` - Company logo text (65x16px)

## Team Member Images

Add these to `/public/team/`:

1. `/team/ceo-avatar.jpg` - CEO/Founder avatar (158x158px, circular)
2. `/team/member-1.jpg` - Team member 1 (384x384px, rounded top-left corner)
   - Background color: `#CFD4C6`
3. `/team/member-2.jpg` - Team member 2 (384x384px, rounded top-right corner)
   - Background color: `#D1E3D9`
4. `/team/member-3.jpg` - Team member 3 (384x384px, rounded top-right corner)
   - Background color: `#E3C6D1`
5. `/team/member-4.jpg` - Team member 4 (384x384px, rounded top-left corner)
   - Background color: `#CFD4C6`
6. `/team/member-5.jpg` - Team member 5 (384x384px, rounded top-right corner)
   - Background color: `#E3C6D1`
7. `/team/member-6.jpg` - Team member 6 (384x384px, rounded top-right corner)
   - Background color: `#D1E3D9`

## Alternative: Using Placeholder Service

Until real images are available, you can use placeholder services by updating the image paths in the components:

### Example for Testimonial Avatar:

```tsx
src = "https://placehold.co/158x158/e0e0e0/666666?text=CEO";
```

### Example for Team Members:

```tsx
src = "https://placehold.co/384x384/CFD4C6/666666?text=Team+Member";
```

## Implementation Notes

The About page has been designed following the Figma specifications with:

- Clean component structure
- Proper internationalization support (English and Arabic)
- Responsive design
- Matching typography and spacing from the design
- Proper color usage as specified in the design system

All components are located in:

- `/src/app/[locale]/about/page.tsx` - Main page
- `/src/components/about/about-hero.tsx` - Hero section
- `/src/components/about/about-testimonial.tsx` - Testimonial/CEO quote section
- `/src/components/about/about-features.tsx` - Features section with 3 alternating layouts
- `/src/components/about/about-team.tsx` - Team section with member cards

Translations are in:

- `/messages/en.json` - English translations
- `/messages/ar.json` - Arabic translations
