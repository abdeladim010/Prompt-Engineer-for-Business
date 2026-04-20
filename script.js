const outputTemplates = {
  branding: "Act as a senior prompt engineer and brand strategist. Create a brand direction prompt for a {businessType} that wants to {goal}. The target audience is {audience}. Include brand personality, positioning, tone of voice, visual cues, color direction, typography ideas, and differentiators. Keep the output commercially focused, modern, and suitable for a business that wants premium results.",
  logo: "Act as a senior AI logo prompt engineer. Write a detailed logo generation prompt for a {businessType} that wants to {goal}. The target audience is {audience}. Include style direction, composition, symbolism, typography feel, color palette, negative prompts, and premium brand references. Optimize the prompt for clean, high-end, memorable results.",
  website: "Act as a conversion-focused website strategist and prompt engineer. Write a prompt for a {businessType} that wants to {goal}. The target audience is {audience}. Generate sections for a homepage including hero, trust builders, services, benefits, objections, CTA copy, and SEO keyword placement. Make the result clear, persuasive, and suitable for B2B growth.",
  marketing: "Act as a direct-response prompt engineer. Create a marketing prompt for a {businessType} that wants to {goal}. The target audience is {audience}. Include ad angles, hooks, offer positioning, headline variations, CTA options, and a testing matrix. Focus on clarity, conversion, and message-market fit.",
  saas: "Act as a senior SaaS prompt engineer. Build a reusable prompt system for a {businessType} that wants to {goal}. The target audience is {audience}. Include onboarding prompts, product messaging prompts, feature explanation prompts, objection handling prompts, and upgrade CTA prompts. The output should be scalable, consistent, and product-led."
};

const generatorForm = document.getElementById("prompt-generator");
const promptOutput = document.getElementById("promptOutput");
const copyPromptButton = document.getElementById("copyPrompt");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (generatorForm && promptOutput) {
  generatorForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const businessType = document.getElementById("businessType").value.trim();
    const goal = document.getElementById("goal").value.trim();
    const outputType = document.getElementById("outputType").value;
    const audience = document.getElementById("audience").value.trim();

    const template = outputTemplates[outputType];

    const prompt = template
      .replace("{businessType}", businessType)
      .replace("{goal}", goal)
      .replace("{audience}", audience);

    promptOutput.textContent = prompt;
  });
}

if (copyPromptButton && promptOutput) {
  copyPromptButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(promptOutput.textContent);
      copyPromptButton.textContent = "Copied";
      window.setTimeout(() => {
        copyPromptButton.textContent = "Copy";
      }, 1600);
    } catch (error) {
      copyPromptButton.textContent = "Copy failed";
      window.setTimeout(() => {
        copyPromptButton.textContent = "Copy";
      }, 1600);
    }
  });
}

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const company = document.getElementById("contactCompany").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    const subject = encodeURIComponent(`Project inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "Not provided"}\n\nProject details:\n${message}`
    );

    formStatus.textContent = "Opening your email app...";
    window.location.href = `mailto:hello@bentabka.com?subject=${subject}&body=${body}`;
  });
}

const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}
