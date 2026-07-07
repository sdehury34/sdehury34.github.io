// ============================================================
// EDIT THIS FILE to change everything shown on the site.
// ============================================================

export const profile = {
  name: 'Somashekhar Dehury',
  firstName: 'Somashekhar',
  status: 'SINGA Scholar · Industrial Doctorate · Singapore',
  // Short role words cycled in the hero
  roles: [
    'Ultrasound Researcher',
    'Deep Learning Engineer',
    'Embedded Systems Tinkerer',
    'Med-Tech Enthusiast',
  ],
  tagline:
    'Industrial doctorate researcher at the Singapore Institute of Technology with Tricog Health, working towards a wearable multi-view echocardiography patch: flexible ultrasound arrays, deep learning beamforming, and GPU accelerated imaging.',
  location: 'Singapore',
  email: 'somashekhar.dehury@gmail.com',
  // Photo lives in /public. Set to null to show a monogram avatar instead.
  photo: `${import.meta.env.BASE_URL}profile.jpg`,
  about: [
    "I went from programming 8051 microcontrollers to imaging the human heart. After my B.Tech in Electronics & Communication at NIT Calicut (CGPA 8.95), I'm now pursuing an Industrial Doctorate in Infocomm Technology at SIT, Singapore, as a SINGA Scholar, building wearable cardiac ultrasound with Tricog Health.",
    'My work lives where signals meet silicon: deep learning for image reconstruction, ultrasound physics simulation with k-Wave and SIMUS, GPU-accelerated beamforming, and the embedded front-end electronics and testing that make it all real.',
    "Beyond the lab, I'm drawn to anything med-tech, including augmented reality in healthcare with Unity, and I'm open to collaborations across deep learning, simulation, and embedded systems.",
  ],
}

export const socials = [
  { label: 'GitHub', url: 'https://github.com/sdehury34' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/somashekhar-d-403195212/' },
  { label: 'Instagram', url: 'https://www.instagram.com/thisissomashekhar/' },
]

// Words for the scrolling ticker under the hero
export const marquee = [
  'Ultrasound Imaging',
  'Deep Learning',
  'Beamforming',
  'k-Wave',
  'GPU Computing',
  'Embedded Systems',
  'FPGA',
  'Signal Processing',
  'Med-Tech',
  'AR in Healthcare',
  'MATLAB',
  'Python',
]

export const skills = [
  {
    group: 'Ultrasound & Simulation',
    items: ['Beamforming', 'k-Wave / SIMUS', 'GPU Acceleration', 'Signal Processing', 'Image Reconstruction'],
  },
  {
    group: 'Deep Learning',
    items: ['TensorFlow', 'OpenCV', 'YOLOv8', 'NLP', 'Jupyter'],
  },
  {
    group: 'Embedded & Hardware',
    items: ['ESP32 / Arduino', '8051 / Keil', 'FPGA / Verilog', 'LTspice / Proteus', 'InfluxDB'],
  },
  {
    group: 'Languages & Tools',
    items: ['Python', 'C / C++', 'MATLAB', 'Git / GitHub', 'VS Code'],
  },
  {
    group: 'Exploring',
    items: ['Unity', 'AR in Healthcare', 'Testing & Validation', 'Robotics'],
  },
]

export const projects = [
  {
    title: 'Wearable Multi-view Echocardiography Patch',
    year: 'Ongoing',
    description:
      'Doctoral research with Tricog Health: a flexible-array cardiac ultrasound system with shape-adaptive and deep-learning beamforming, a custom digital front-end, and a GPU-accelerated software-defined imaging pipeline on commodity hardware.',
    tech: ['Ultrasound', 'Deep Learning', 'GPU / CUDA', 'k-Wave', 'FPGA'],
    link: null,
    repo: null,
  },
  {
    title: 'Lunar Lander Control & Crater Detection',
    year: '2023',
    description:
      'Internship at ISRO: simulated the control system of the lunar lander in MATLAB and explored deep-learning techniques for automatic crater detection during descent.',
    tech: ['MATLAB', 'Control Systems', 'Deep Learning'],
    link: null,
    repo: null,
  },
  {
    title: 'Accelerator Lab Data Acquisition',
    year: '2024',
    description:
      'DAAD WISE internship at GSI Helmholtz Centre for Heavy Ion Research, Germany: programmed Arduino/ESP32 platforms to control power supplies over serial interfaces, streaming and visualizing live data into InfluxDB.',
    tech: ['ESP32', 'Arduino', 'InfluxDB', 'Serial / Instrumentation'],
    link: null,
    repo: null,
  },
  {
    title: 'Automatic Book Scanner',
    year: '2022',
    description:
      'Smart India Hackathon national finalist: a machine that turns pages automatically, digitizes text, and translates it with pretrained NLP models. We were the only team called from the Kerala region for the finale in New Delhi.',
    tech: ['Arduino', 'Deep Learning', 'NLP'],
    link: null,
    repo: null,
  },
  {
    title: 'Automatic Pothole Filler',
    year: '2023',
    description:
      'Ramaiah Hackathon finalist: real-time pothole detection with YOLOv8 driving an Arduino-controlled filling mechanism over Wi-Fi.',
    tech: ['YOLOv8', 'Python', 'Arduino'],
    link: null,
    repo: null,
  },
]

export const milestones = [
  // Achievements / experience timeline — newest first
  {
    year: 'Present',
    title: 'Industrial Doctorate, SIT × Tricog Health',
    detail:
      'SINGA Scholar at the Singapore Institute of Technology (Infocomm Technology), researching wearable multi-view echocardiography: flexible ultrasound arrays, adaptive beamforming, and GPU imaging pipelines.',
  },
  {
    year: '2025',
    title: 'B.Tech, NIT Calicut',
    detail:
      'Graduated in Electronics & Communication Engineering with a CGPA of 8.95.',
  },
  {
    year: '2024',
    title: 'DAAD WISE Scholar, GSI Helmholtz Centre, Germany',
    detail:
      'Research intern at the heavy-ion research facility in Darmstadt, building microcontroller-based data acquisition and instrumentation control.',
  },
  {
    year: '2023',
    title: 'Research Intern, ISRO',
    detail:
      'Worked on lunar lander control simulation and deep-learning-based crater detection at Trivandrum.',
  },
  {
    year: '2022',
    title: 'Smart India Hackathon National Finalist',
    detail:
      'Built an automatic book scanner with NLP translation; selected for the national finale in New Delhi.',
  },
]

export const education = [
  {
    school: 'Singapore Institute of Technology',
    degree: 'Industrial Doctorate in Infocomm Technology (SINGA Scholar)',
    years: 'Ongoing',
  },
  {
    school: 'National Institute of Technology, Calicut',
    degree: 'B.Tech in Electronics & Communication, CGPA 8.95',
    years: '2021-2025',
  },
]
