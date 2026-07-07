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
  // wrap words in **double asterisks** to highlight them on the page
  about: [
    "I went from programming 8051 microcontrollers to **imaging the human heart**. After my B.Tech in Electronics & Communication at NIT Calicut (CGPA 8.95), I'm now pursuing an **Industrial Doctorate** at SIT, Singapore, as a **SINGA Scholar**, building **wearable cardiac ultrasound** with Tricog Health.",
    'My work lives where signals meet silicon: **deep learning** for image reconstruction, ultrasound physics simulation with **k-Wave and SIMUS**, **GPU-accelerated beamforming**, and the embedded front-end electronics and testing that make it all real.',
    "Beyond the lab, I'm drawn to anything **med-tech**, including **augmented reality in healthcare** with Unity, and I'm open to collaborations across deep learning, simulation, and embedded systems.",
  ],
}

// Doctorate research, described at a public-safe level
export const research = {
  intro:
    'My doctorate tackles a hard problem in cardiac care: echocardiography today needs rigid probes, trained sonographers, and expensive carts. I work on a wearable alternative that images the heart continuously from multiple views.',
  areas: [
    {
      icon: 'Waves',
      title: 'Flexible Ultrasound Arrays',
      text: 'Conformal transducer arrays that wrap around the chest for hands-free, multi-view cardiac imaging, simulated and validated with k-Wave and SIMUS.',
    },
    {
      icon: 'Brain',
      title: 'Deep Learning Beamforming',
      text: 'Shape-adaptive and learning-based beamforming that reconstructs high-quality images even when the array geometry bends with the body.',
    },
    {
      icon: 'Zap',
      title: 'GPU Imaging Pipeline',
      text: 'A software-defined, GPU-accelerated processing chain on commodity hardware, replacing costly custom silicon and enabling unlimited algorithm updates.',
    },
    {
      icon: 'CircuitBoard',
      title: 'Front-End Electronics & Testing',
      text: 'Custom digital front-end design, FPGA firmware, signal-chain validation, and phantom benchmarking to take the system from concept to prototype.',
    },
  ],
}

export const publications = [
  {
    title:
      'Mobile Augmented Reality for Hip Osteotomy Planning: Integration with 3D Slicer and Pilot Evaluation',
    authors:
      'Piyush Soni, Rahul Ganesh S, Somashekhar Dehury, Inger A. Grünbeck, Ola Wiig, Sudhish N. George, Rahul Prasanna Kumar',
    venue: 'IEEE ISBI, London',
    year: '2026',
    tag: 'AR in Healthcare',
    link: 'https://ieeexplore.ieee.org/document/11515497',
  },
  {
    title:
      'Uncertainty-Guided Multi-Task Consistency for Semi-Supervised Carotid Plaque Segmentation and Vulnerability Assessment',
    authors:
      'Mahesh Raveendranatha Panicker, Rudra Sainatha, Gopika Gopikrishnan, Somashekhar Dehury',
    venue: 'IEEE ISBI, London',
    year: '2026',
    tag: 'Ultrasound + DL',
    link: 'https://ieeexplore.ieee.org/document/11516005',
  },
]

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

// type controls the color coding on the timeline:
// research (sky) | education (teal) | internship (violet) | award (amber)
export const milestones = [
  {
    year: 'Present',
    type: 'research',
    label: 'Research',
    title: 'Industrial Doctorate, SIT × Tricog Health',
    detail:
      'SINGA Scholar at the Singapore Institute of Technology (Infocomm Technology), researching wearable multi-view echocardiography: flexible ultrasound arrays, adaptive beamforming, and GPU imaging pipelines.',
  },
  {
    year: '2025',
    type: 'education',
    label: 'Education',
    title: 'B.Tech, NIT Calicut',
    detail:
      'Graduated in Electronics & Communication Engineering with a CGPA of 8.95.',
  },
  {
    year: '2024',
    type: 'internship',
    label: 'Internship',
    title: 'DAAD WISE Scholar, GSI Helmholtz Centre, Germany',
    detail:
      'Research intern at the heavy-ion research facility in Darmstadt, building microcontroller-based data acquisition and instrumentation control.',
  },
  {
    year: '2023',
    type: 'internship',
    label: 'Internship',
    title: 'Research Intern, ISRO',
    detail:
      'Worked on lunar lander control simulation and deep-learning-based crater detection at Trivandrum.',
  },
  {
    year: '2022',
    type: 'award',
    label: 'Achievement',
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
