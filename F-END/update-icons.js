const fs = require('fs');
const path = require('path');

const files = [
  "src/components/home/NewsletterBand.tsx",
  "src/components/home/Hero.tsx",
  "src/components/home/FreshThisWeek.tsx",
  "src/components/home/CategorySpotlight.tsx",
  "src/components/home/BrandStoryTeaser.tsx",
  "src/components/cart/CartDrawer.tsx",
  "src/app/policies/page.tsx",
  "src/app/faq/page.tsx",
  "src/app/order-confirmation/[orderId]/page.tsx",
  "src/app/corporate-orders/page.tsx",
  "src/app/corporate-orders/CorporateForm.tsx",
  "src/app/contact/page.tsx",
  "src/app/contact/ContactForm.tsx",
  "src/app/checkout/page.tsx",
  "src/app/checkout/CheckoutForm.tsx",
  "src/app/cart/page.tsx",
  "src/app/about/page.tsx"
];

for (const f of files) {
  const fullPath = path.join('e:/VINOD', f);
  if (!fs.existsSync(fullPath)) continue;
  
  let content = fs.readFileSync(fullPath, 'utf-8');
  let changed = false;
  
  // Replace HelpCircle with MessageCircleQuestion
  if (content.includes('HelpCircle')) {
    content = content.replace(/HelpCircle/g, 'MessageCircleQuestion');
    changed = true;
  }
  // Replace CheckCircle2 with Leaf in BrandStoryTeaser
  if (f.includes('BrandStoryTeaser') && content.includes('CheckCircle2')) {
    content = content.replace(/CheckCircle2/g, 'Leaf');
    changed = true;
  }
  // Replace Gift with PackageSearch or PartyPopper
  if (f.includes('corporate-orders') && content.includes('Gift')) {
    content = content.replace(/Gift/g, 'PackageOpen');
    changed = true;
  }

  // Find all lucide imports
  const importMatch = content.match(/import\s+{([^}]+)}\s+from\s+["']lucide-react["']/);
  if (importMatch) {
    const icons = importMatch[1].split(',').map(s => s.trim().split(/\s+/)[0]).filter(Boolean);
    for (const icon of icons) {
      if (icon === 'LucideIcon' || icon === 'type') continue;
      
      const regex = new RegExp(`<${icon}\\s+([^>]*?)/?>`, 'g');
      content = content.replace(regex, (match, p1) => {
        if (!p1.includes('strokeWidth')) {
          changed = true;
          // normalize 3.5 to 4
          let newP1 = p1.replace(/w-3\.5/g, 'w-4').replace(/h-3\.5/g, 'h-4');
          
          // add hover scale to specific interactive icons
          const interactiveIcons = ['Minus', 'Plus', 'Trash2', 'X', 'ChevronDown', 'Send', 'ArrowUpRight', 'ArrowRight', 'ArrowLeft'];
          if (interactiveIcons.includes(icon) && !newP1.includes('group-hover:scale-110')) {
            // add group-hover if it has a classname, else append
            if (newP1.includes('className="')) {
              newP1 = newP1.replace('className="', 'className="transition-transform duration-200 group-hover:scale-110 hover:scale-110 ');
            } else {
              newP1 += ' className="transition-transform duration-200 hover:scale-110"';
            }
          }

          if (match.endsWith('/>')) {
             return `<${icon} ${newP1.trim()} strokeWidth={1.5} />`;
          }
          return `<${icon} ${newP1.trim()} strokeWidth={1.5}>`;
        }
        return match;
      });
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, content);
    console.log('Updated ' + f);
  }
}
