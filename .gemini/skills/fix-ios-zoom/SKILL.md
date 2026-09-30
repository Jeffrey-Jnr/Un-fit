---
name: fix-ios-zoom
description: Use this skill to automatically audit a frontend application and apply necessary CSS or Tailwind class overrides to prevent iOS Safari from zooming in on input fields.
---

# Fix iOS Zoom

## Goal
Prevent iOS Safari from aggressively zooming in when a user taps on `<input>`, `<textarea>`, or `<select>` elements on a mobile device. This happens natively when the font size of the input is smaller than `16px`.

## Execution Steps

1.  **Analyze the Styling Setup:** Determine if the project uses global CSS, CSS modules, or Tailwind CSS.
2.  **Global CSS Approach (Preferred for comprehensiveness):**
    *   Find the global stylesheet (e.g., `app/globals.css`, `styles/globals.css`, or `index.css`).
    *   Inject the following media query block to safely enforce a `16px` font size on mobile viewports without affecting desktop scaling:
        ```css
        /* Prevent iOS zooming on inputs */
        @media screen and (max-width: 768px) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }
        ```
3.  **Tailwind Utility Approach:**
    *   If targeting specific components instead of a global fix, ensure all `input`, `select`, and `textarea` elements use at least `text-base` (which resolves to `16px` in default Tailwind) or `text-[16px]`.
    *   Avoid using `text-sm` (14px) or smaller for inputs on mobile. If small text is desired on desktop, use responsive prefixes: e.g., `text-base md:text-sm`.
4.  **Verify:** Confirm the CSS changes were written and advise the user to deploy and test the form fields on an actual iOS device.
