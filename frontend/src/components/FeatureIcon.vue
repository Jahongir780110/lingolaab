<script setup>
defineProps({
  name: {
    type: String,
    required: true
  }
})
</script>

<template>
  <!-- 1. Structured Courses (Open Book) -->
  <svg v-if="name === 'courses'" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
    <defs>
      <linearGradient id="bookCover" x1="6" y1="36" x2="38" y2="36" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#0284C7" />
        <stop offset="100%" stop-color="#38BDF8" />
      </linearGradient>
      <linearGradient id="pageGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#F1F5F9" />
      </linearGradient>
      <filter id="bookShadow" x="3" y="10" width="38" height="28" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#0284C7" flood-opacity="0.18" />
      </filter>
    </defs>
    <!-- Back Cover Base -->
    <path d="M6 31C13 29 19 31 22 34C25 31 31 29 38 31V34C31 32 25 34 22 37C19 34 13 32 6 34V31Z" fill="url(#bookCover)" />
    <!-- Left Page -->
    <path d="M7 13.5C13.5 14.8 18.5 13.8 21.5 16V33.5C18.5 31.5 13.5 32 7 30.5V13.5Z" fill="url(#pageGrad)" stroke="#CBD5E1" stroke-width="0.8" />
    <!-- Right Page -->
    <path d="M37 13.5C30.5 14.8 25.5 13.8 22.5 16V33.5C25.5 31.5 30.5 32 37 30.5V13.5Z" fill="url(#pageGrad)" stroke="#CBD5E1" stroke-width="0.8" />
    <!-- Center Spine Crease -->
    <path d="M22 16V34" stroke="#94A3B8" stroke-width="1.2" stroke-linecap="round" />
    <!-- Left Page Lines -->
    <line x1="10" y1="18.5" x2="18.5" y2="18.5" stroke="#94A3B8" stroke-width="1.3" stroke-linecap="round" />
    <line x1="10" y1="22.5" x2="17.5" y2="22.5" stroke="#CBD5E1" stroke-width="1.3" stroke-linecap="round" />
    <line x1="10" y1="26.5" x2="16" y2="26.5" stroke="#CBD5E1" stroke-width="1.3" stroke-linecap="round" />
    <!-- Right Page Lines -->
    <line x1="25.5" y1="18.5" x2="34" y2="18.5" stroke="#00A8CC" stroke-width="1.3" stroke-linecap="round" />
    <line x1="25.5" y1="22.5" x2="33" y2="22.5" stroke="#CBD5E1" stroke-width="1.3" stroke-linecap="round" />
    <line x1="25.5" y1="26.5" x2="31.5" y2="26.5" stroke="#CBD5E1" stroke-width="1.3" stroke-linecap="round" />
  </svg>

  <!-- 2. Smart Library (Stacked Colorful Books) -->
  <svg v-else-if="name === 'library'" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
    <defs>
      <linearGradient id="greenBook" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#34D399" />
        <stop offset="100%" stop-color="#059669" />
      </linearGradient>
      <linearGradient id="redBook" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#FB7185" />
        <stop offset="100%" stop-color="#E11D48" />
      </linearGradient>
      <linearGradient id="blueBook" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#38BDF8" />
        <stop offset="100%" stop-color="#0284C7" />
      </linearGradient>
    </defs>
    <!-- Book 1: Back/Left Green Book (Vertical) -->
    <g transform="translate(6, 9)">
      <rect x="0" y="0" width="8" height="26" rx="2" fill="url(#greenBook)" />
      <rect x="6" y="2" width="2" height="22" fill="#F8FAFC" />
      <line x1="2.5" y1="6" x2="2.5" y2="12" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" />
    </g>
    <!-- Book 2: Middle Red Book -->
    <g transform="translate(16, 7)">
      <rect x="0" y="0" width="8" height="28" rx="2" fill="url(#redBook)" />
      <rect x="6" y="2" width="2" height="24" fill="#F8FAFC" />
      <line x1="2.5" y1="6" x2="2.5" y2="14" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" />
    </g>
    <!-- Book 3: Right Blue Book (Leaning slightly) -->
    <g transform="translate(26, 11) rotate(12)">
      <rect x="0" y="0" width="8" height="25" rx="2" fill="url(#blueBook)" />
      <rect x="6" y="2" width="2" height="21" fill="#F8FAFC" />
      <line x1="2.5" y1="5" x2="2.5" y2="11" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" />
    </g>
    <!-- Ground Base Shadow -->
    <ellipse cx="22" cy="37" rx="15" ry="2" fill="#000000" fill-opacity="0.06" />
  </svg>

  <!-- 3. AI Tutor (Friendly Cute Robot Head) -->
  <svg v-else-if="name === 'tutor'" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
    <defs>
      <linearGradient id="robotHead" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="#EDE9FE" />
      </linearGradient>
      <linearGradient id="pinkEar" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#F43F5E" />
        <stop offset="100%" stop-color="#E11D48" />
      </linearGradient>
      <linearGradient id="cyanEyes" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#22D3EE" />
        <stop offset="100%" stop-color="#06B6D4" />
      </linearGradient>
    </defs>
    <!-- Antenna Tip -->
    <circle cx="22" cy="7" r="2.5" fill="#F59E0B" />
    <path d="M22 9.5V13" stroke="#CBD5E1" stroke-width="2" stroke-linecap="round" />
    <!-- Left Pink Ear -->
    <rect x="5" y="20" width="3.5" height="9" rx="1.75" fill="url(#pinkEar)" />
    <!-- Right Pink Ear -->
    <rect x="35.5" y="20" width="3.5" height="9" rx="1.75" fill="url(#pinkEar)" />
    <!-- Main Head Shape -->
    <rect x="7.5" y="13" width="29" height="23" rx="7" fill="url(#robotHead)" stroke="#CBD5E1" stroke-width="1.2" />
    <!-- Face Screen / Visor -->
    <rect x="11.5" y="17" width="21" height="12" rx="4" fill="#1E1B4B" />
    <!-- Glowing Cyan Eyes -->
    <rect x="14.5" y="20" width="4.5" height="6" rx="2.25" fill="url(#cyanEyes)" />
    <rect x="25" y="20" width="4.5" height="6" rx="2.25" fill="url(#cyanEyes)" />
    <!-- Tiny eye highlights -->
    <circle cx="16" cy="21.5" r="1" fill="#FFFFFF" />
    <circle cx="26.5" cy="21.5" r="1" fill="#FFFFFF" />
    <!-- Soft Smile -->
    <path d="M19 32C20.5 33.2 23.5 33.2 25 32" stroke="#64748B" stroke-width="1.5" stroke-linecap="round" />
  </svg>

  <!-- 4. Speaking Practice (Studio Microphone) -->
  <svg v-else-if="name === 'speaking'" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
    <defs>
      <linearGradient id="micMetal" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#E2E8F0" />
        <stop offset="45%" stop-color="#CBD5E1" />
        <stop offset="100%" stop-color="#94A3B8" />
      </linearGradient>
      <linearGradient id="micStand" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#64748B" />
        <stop offset="100%" stop-color="#475569" />
      </linearGradient>
    </defs>
    <!-- Mic Pill Body -->
    <rect x="16" y="8" width="12" height="18" rx="6" fill="url(#micMetal)" stroke="#64748B" stroke-width="1" />
    <!-- Horizontal Grille Lines -->
    <line x1="17.5" y1="13" x2="26.5" y2="13" stroke="#64748B" stroke-width="1.1" stroke-linecap="round" />
    <line x1="16.5" y1="17" x2="27.5" y2="17" stroke="#64748B" stroke-width="1.1" stroke-linecap="round" />
    <line x1="17.5" y1="21" x2="26.5" y2="21" stroke="#64748B" stroke-width="1.1" stroke-linecap="round" />
    <!-- U-Shaped Cradle Swivel -->
    <path d="M12 18C12 24 16 27.5 22 27.5C28 27.5 32 24 32 18" stroke="#475569" stroke-width="2.2" stroke-linecap="round" />
    <!-- Vertical Stand Stem -->
    <line x1="22" y1="28" x2="22" y2="34" stroke="url(#micStand)" stroke-width="2.4" stroke-linecap="round" />
    <!-- Weighted Circular Base -->
    <ellipse cx="22" cy="35" rx="8" ry="2.5" fill="url(#micStand)" />
    <ellipse cx="22" cy="34" rx="6" ry="1.5" fill="#94A3B8" />
  </svg>

  <!-- 5. Tracks Your Progress (Analytics Chart Board) -->
  <svg v-else-if="name === 'progress'" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
    <defs>
      <linearGradient id="chartLine" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="#6366F1" />
        <stop offset="100%" stop-color="#00A8CC" />
      </linearGradient>
      <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(0, 168, 204, 0.25)" />
        <stop offset="100%" stop-color="rgba(99, 102, 241, 0.02)" />
      </linearGradient>
    </defs>
    <!-- Background Graph Card -->
    <rect x="7" y="8" width="30" height="28" rx="5" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" />
    <!-- Subtle Grid Lines -->
    <line x1="11" y1="15" x2="33" y2="15" stroke="#F1F5F9" stroke-width="1.2" />
    <line x1="11" y1="21" x2="33" y2="21" stroke="#F1F5F9" stroke-width="1.2" />
    <line x1="11" y1="27" x2="33" y2="27" stroke="#F1F5F9" stroke-width="1.2" />
    <!-- Chart Fill Area -->
    <path d="M11 28L17 22L23 25L32 14V30H11V28Z" fill="url(#chartArea)" />
    <!-- Upward Trend Line -->
    <path d="M11 28L17 22L23 25L32 14" stroke="url(#chartLine)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Data Points -->
    <circle cx="17" cy="22" r="2" fill="#FFFFFF" stroke="#6366F1" stroke-width="1.8" />
    <circle cx="23" cy="25" r="2" fill="#FFFFFF" stroke="#6366F1" stroke-width="1.8" />
    <circle cx="32" cy="14" r="2.4" fill="#00A8CC" stroke="#FFFFFF" stroke-width="1.5" />
  </svg>

  <!-- 6. Starts With You (3D Glossy Blue Heart) -->
  <svg v-else-if="name === 'personalized'" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" class="feature-svg">
    <defs>
      <linearGradient id="heartBlue" x1="12" y1="8" x2="30" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stop-color="#60A5FA" />
        <stop offset="35%" stop-color="#3B82F6" />
        <stop offset="100%" stop-color="#1D4ED8" />
      </linearGradient>
      <filter id="heartGlow" x="4" y="6" width="36" height="34" filterUnits="userSpaceOnUse">
        <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#2563EB" flood-opacity="0.32" />
      </filter>
    </defs>
    <!-- Heart Base with Drop Shadow -->
    <g filter="url(#heartGlow)">
      <path d="M22 34.5C21.4 34.5 9 26.5 9 17C9 12.3 12.7 8.5 17.2 8.5C19.5 8.5 21.3 9.7 22 10.8C22.7 9.7 24.5 8.5 26.8 8.5C31.3 8.5 35 12.3 35 17C35 26.5 22.6 34.5 22 34.5Z" fill="url(#heartBlue)" />
    </g>
    <!-- Specular Highlight Curve on Left Lobe -->
    <path d="M14.5 12C12.5 14 12 17.5 12.2 19" stroke="#FFFFFF" stroke-width="1.6" stroke-linecap="round" stroke-opacity="0.6" />
    <!-- Secondary small highlight dot -->
    <ellipse cx="17" cy="11.5" rx="1.8" ry="1" transform="rotate(-30 17 11.5)" fill="#FFFFFF" fill-opacity="0.75" />
  </svg>
</template>

<style scoped>
.feature-svg {
  width: 36px;
  height: 36px;
  display: block;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.feature-svg:hover {
  transform: scale(1.08);
}
</style>
