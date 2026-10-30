'use client';

/* Text that lives inside interactive (client) components: header, footer, dialogs and the like.
   Page content is translated on the server instead (see localize.ts and the ne/ folder). */

import { usePathname } from 'next/navigation';
import { langFromPath, type Lang } from './lang';
import { names } from './ne/names';

const ui: Record<string, string> = {
  ...names,
  // header
  'About the School': 'विद्यालयबारे',
  Academics: 'शैक्षिक',
  'Boarding life': 'छात्रावास जीवन',
  'Beyond class': 'कक्षाभन्दा बाहिर',
  Visit: 'भ्रमण',
  "Prospectus '26": 'विवरणिका 2026',
  'Prospectus film': 'विवरणिका भिडियो',
  Admissions: 'भर्ना',
  'View sitemap': 'साइटम्याप हेर्नुहोस्',
  'Menu ☰': 'मेनु ☰',
  'Close ×': 'बन्द ×',
  'Open navigation': 'मेनु खोल्नुहोस्',
  'Close navigation': 'मेनु बन्द गर्नुहोस्',
  'Main navigation': 'मुख्य मेनु',
  'Brindavan Boarding School home': 'वृन्दावन बोर्डिङ स्कूल गृहपृष्ठ',
  'Brindavan Boarding School crest': 'वृन्दावन बोर्डिङ स्कूलको चिह्न',
  Brindavan: 'वृन्दावन',
  'Boarding School': 'बोर्डिङ स्कूल',
  'Brindavan Boarding School': 'वृन्दावन बोर्डिङ स्कूल',
  // footer
  'Love All,': 'सबैलाई प्रेम गर,',
  'Serve All.': 'सबैको सेवा गर।',
  'Back to top': 'माथि जानुहोस्',
  EXPLORE: 'हेर्नुहोस्',
  CONNECT: 'सम्पर्क',
  'FIND US': 'हामीलाई भेट्नुहोस्',
  'Seeyok Fatak, Mirik': 'सियोक फाटक, मिरिक',
  'Darjeeling, West Bengal · 734214': 'दार्जिलिङ, पश्चिम बंगाल · 734214',
  Facebook: 'फेसबुक',
  'Designed and Developed by :': 'वेबसाइट डिजाइन :',
  'Open in Google Maps': 'गुगल म्यापमा खोल्नुहोस्',
  'Map showing Brindavan Boarding School, Seeyok Fatak, Mirik':
    'वृन्दावन बोर्डिङ स्कूल, सियोक फाटक, मिरिक देखाउने नक्सा',
  // admissions card in the footer
  'ADMISSIONS 2026': 'भर्ना 2026',
  'Admissions for 2026 are': '2026 का लागि भर्ना',
  'open.': 'खुला छ।',
  'Request prospectus': 'विवरणिका माग्नुहोस्',
  'Call the school': 'विद्यालयमा फोन गर्नुहोस्',
  'Plan a visit': 'भ्रमणको योजना बनाउनुहोस्',
  // mobile quick actions
  'Book a visit': 'भ्रमण बुक गर्नुहोस्',
  'Quick actions': 'छिटो पहुँच',
  // prospectus dialog
  Close: 'बन्द गर्नुहोस्',
  'Get the Prospectus': 'विवरणिका पाउनुहोस्',
  'Share your details and we will send you the prospectus on WhatsApp.':
    'आफ्नो विवरण दिनुहोस्, हामी तपाईंलाई ह्वाट्सएपमा विवरणिका पठाउनेछौं।',
  'Full name': 'पूरा नाम',
  'WhatsApp number': 'ह्वाट्सएप नम्बर',
  'Send request': 'अनुरोध पठाउनुहोस्',
  // photo pile, flip cards, boarding opening
  'Show the next photo': 'अर्को फोटो हेर्नुहोस्',
  'Next →': 'अर्को →',
  'What to ask ↻': 'के सोध्ने ↻',
  // visit: postcard and find us
  'Turn the postcard over': 'पोस्टकार्ड पल्टाउनुहोस्',
  'Turn over ↻': 'पल्टाउनुहोस् ↻',
  'Photos:': 'तस्बिर:',
  'Copy address': 'ठेगाना कपी गर्नुहोस्',
  'Address copied ✓': 'ठेगाना कपी भयो ✓',
  // beyond class: moments ring
  'Moments from the school year': 'विद्यालय वर्षका क्षण',
  'Previous photo': 'अघिल्लो फोटो',
  'Next photo': 'अर्को फोटो',
  'Drag to spin · click a photo': 'घुमाउन तान्नुहोस् · फोटोमा क्लिक गर्नुहोस्',
  'Swipe to spin · tap a photo': 'घुमाउन स्वाइप गर्नुहोस् · फोटोमा ट्याप गर्नुहोस्',
  'Back to home': 'गृहपृष्ठमा फर्कनुहोस्',
  'A COMMUNITY TO CALL YOUR OWN': 'आफ्नै भन्न सकिने समुदाय',
  'School is a chapter.': 'विद्यालय एउटा अध्याय हो।',
  'Belonging is': 'आत्मीयता',
  'for life.': 'जीवनभरको।',
  'Choosing a boarding school is a personal decision. This page walks through what boarding life at Brindavan generally involves, so a visit can focus on the specific details that matter to your family.':
    'बोर्डिङ स्कूल छान्नु व्यक्तिगत निर्णय हो। यो पृष्ठले वृन्दावनको छात्रावास जीवनमा सामान्यतया के-के हुन्छ भनेर बताउँछ, ताकि भ्रमणका बेला तपाईं आफ्नो परिवारका लागि महत्त्वपूर्ण कुरामा ध्यान दिन सक्नुहुन्छ।',
  'Boarders playing football in the courtyard between the blue classroom blocks':
    'नीला कक्षा भवनहरूबीचको आँगनमा फुटबल खेलिरहेका छात्रावासका विद्यार्थी',
  'The courtyard, between classes': 'कक्षाको बीचमा, आँगन',
  'The Brindavan courtyard and blue school building, with boarders playing in house colours':
    'वृन्दावनको आँगन र नीलो विद्यालय भवन, हाउसका रङमा खेलिरहेका छात्रावासका विद्यार्थीसहित',
  // video testimonials
  Student: 'विद्यार्थी',
  Teacher: 'शिक्षक',
  Previous: 'अघिल्लो',
  Next: 'अर्को',
  'Play video': 'भिडियो हेर्नुहोस्',
  'Plan your visit': 'भ्रमणको योजना बनाउनुहोस्',
  'Hear it in person.': 'आफैं आएर सुन्नुहोस्।',
  'Visit the campus and meet our students and teachers.':
    'क्याम्पस घुम्नुहोस् र हाम्रा विद्यार्थी तथा शिक्षकलाई भेट्नुहोस्।',
  'Student from the Northeast': 'उत्तरपूर्वकी विद्यार्थी',
  'Class 6': 'कक्षा 6',
  'Class 7': 'कक्षा 7',
  'Class 11': 'कक्षा 11',
  'Class 12': 'कक्षा 12',
  'English Teacher': 'अङ्ग्रेजी शिक्षक',
  'Biology Teacher': 'जीवविज्ञान शिक्षक',
  'Economics & Geography Teacher': 'अर्थशास्त्र र भूगोल शिक्षक',
};

export function useLang(): Lang {
  return langFromPath(usePathname());
}

/** Gives a UI string in the given language. */
export function translate(text: string, lang: Lang) {
  return lang === 'ne' ? (ui[text] ?? text) : text;
}

/** Returns a function that gives the current page's language version of a UI string. */
export function useT() {
  const lang = useLang();
  return (text: string) => translate(text, lang);
}
