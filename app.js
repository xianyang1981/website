// ===== 相册数据 =====
const photoTemplates = [
  {
    src: 'https://coze-coding-project.tos.coze.site/coze_storage_7670514662995197978/image/generate_image_aaf7cbcc-b96b-4ac6-9840-4d41f6998a14.jpeg?sign=1817469717-fe407ebaa9-0-f7f5a7d8307815540d6387fd03d3b0a27e9edf22ab0717864e96d99b54b5bdf5',
    alt: '金色时刻的山脉',
    title: '金色时刻',
    width: 1536,
    height: 1024,
  },
  {
    src: 'https://coze-coding-project.tos.coze.site/coze_storage_7670514662995197978/image/generate_image_83e4fecd-3c08-4cc7-aef3-99f45d89deb6.jpeg?sign=1817469721-3c872b7a9c-0-1374dffebc80426428cb3f0a9934eae19a83be8c47d5627979f02595c2a5631a',
    alt: '黎明时分的海洋',
    title: '黎明海岸',
    width: 1536,
    height: 1024,
  },
  {
    src: 'https://coze-coding-project.tos.coze.site/coze_storage_7670514662995197978/image/generate_image_4da0576d-abe2-4dc8-b116-77e3cc2f4832.jpeg?sign=1817469716-a9f70751fc-0-ac1f3d01d960eb2c97fc5d84ce02ac7789b1d4aa55cef0c0b148d3886bc9845e',
    alt: '薰衣草花田',
    title: '紫色花海',
    width: 1536,
    height: 1024,
  },
  {
    src: 'https://coze-coding-project.tos.coze.site/coze_storage_7670514662995197978/image/generate_image_9ea9b083-b897-4bae-81f8-6a9324463183.jpeg?sign=1817469716-309eaafb55-0-b97daf5411c1e7195be0a01c1123f4953156de75092626b01d530d5206e424e1',
    alt: '现代玻璃建筑',
    title: '光影之镜',
    width: 1024,
    height: 1536,
  },
  {
    src: 'https://coze-coding-project.tos.coze.site/coze_storage_7670514662995197978/image/generate_image_35b532af-3753-4869-8b3a-63c5dc74a318.jpeg?sign=1817469719-6963a4c5a2-0-cd87a32f16601544af52249f8b5685492ccdc2106558b7d46e0ec2f99c990f03',
    alt: '晨露微距',
    title: '晨露',
    width: 1024,
    height: 1024,
  },
  {
    src: 'https://coze-coding-project.tos.coze.site/coze_storage_7670514662995197978/image/generate_image_f66ae0bb-f091-4fb1-917b-e66374f09bf7.jpeg?sign=1817469717-bef1e2a9c4-0-e9b66856a8c30f5cf923635aa1470a0adef420ec00bdb1f529d3254a9f726876',
    alt: '欧洲古街',
    title: '石板路',
    width: 1024,
    height: 1536,
  },
];

// 生成从2012年到2026年的照片数据
function generatePhotos() {
  const photos = [];
  const currentYear = 2026;
  const startYear = 2012;
  let photoIndex = 0;

  for (let year = startYear; year <= currentYear; year++) {
    const monthsPerYear = 2 + Math.floor(Math.random() * 3);
    const months = [];

    while (months.length < monthsPerYear) {
      const month = 1 + Math.floor(Math.random() * 12);
      if (!months.includes(month)) {
        months.push(month);
      }
    }
    months.sort((a, b) => a - b);

    for (const month of months) {
      const photosPerMonth = 1 + Math.floor(Math.random() * 3);

      for (let i = 0; i < photosPerMonth; i++) {
        const template = photoTemplates[photoIndex % photoTemplates.length];
        const day = 1 + Math.floor(Math.random() * 28);

        photos.push({
          id: `photo-${year}-${month}-${i}`,
          src: template.src,
          alt: template.alt,
          title: template.title,
          date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
          width: template.width,
          height: template.height,
        });

        photoIndex++;
      }
    }
  }

  return photos;
}

const allPhotos = generatePhotos();

// 按年月分组
function getMonthGroups() {
  const groupMap = new Map();

  for (const photo of allPhotos) {
    const [yearStr, monthStr] = photo.date.split('-');
    const year = parseInt(yearStr, 10);
    const month = parseInt(monthStr, 10);
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const label = `${year}年${month}月`;

    if (!groupMap.has(key)) {
      groupMap.set(key, { year, month, label, photos: [] });
    }
    groupMap.get(key).photos.push(photo);
  }

  return Array.from(groupMap.values()).sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
}

function getAllPhotos() {
  return [...allPhotos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// ===== 应用状态 =====
const monthGroups = getMonthGroups();
let activeMonth = null;
let currentPhotoIndex = 0;
let filteredPhotos = getAllPhotos();

// ===== DOM 元素 =====
const albumNav = document.getElementById('albumNav');
const heroTitle = document.getElementById('heroTitle');
const heroDesc = document.getElementById('heroDesc');
const heroCount = document.getElementById('heroCount');
const photoGrid = document.getElementById('photoGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCounter = document.getElementById('lightboxCounter');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

// ===== 渲染导航 =====
function renderNav() {
  albumNav.innerHTML = '';

  // 全部按钮
  const allBtn = document.createElement('button');
  allBtn.className = `nav-btn${activeMonth === null ? ' active' : ''}`;
  allBtn.textContent = '全部';
  allBtn.addEventListener('click', () => selectMonth(null));
  albumNav.appendChild(allBtn);

  // 年月按钮
  monthGroups.forEach((group) => {
    const key = `${group.year}-${String(group.month).padStart(2, '0')}`;
    const btn = document.createElement('button');
    btn.className = `nav-btn${activeMonth === key ? ' active' : ''}`;
    btn.textContent = group.label;
    btn.addEventListener('click', () => selectMonth(key));
    albumNav.appendChild(btn);
  });

  // 滚动到选中按钮
  if (activeMonth !== null) {
    setTimeout(() => {
      const activeBtn = albumNav.querySelector('.nav-btn.active');
      if (activeBtn) {
        const containerWidth = albumNav.offsetWidth;
        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.offsetWidth;
        const scrollPosition = btnLeft - (containerWidth / 2) + (btnWidth / 2);
        albumNav.scrollTo({
          left: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }
    }, 100);
  }
}

// ===== 选择月份 =====
function selectMonth(monthKey) {
  activeMonth = monthKey;

  if (monthKey === null) {
    filteredPhotos = getAllPhotos();
  } else {
    const group = monthGroups.find((g) => {
      const key = `${g.year}-${String(g.month).padStart(2, '0')}`;
      return key === monthKey;
    });
    filteredPhotos = group ? group.photos : [];
  }

  renderNav();
  renderHero();
  renderPhotos();
}

// ===== 渲染 Hero =====
function renderHero() {
  if (activeMonth === null) {
    heroTitle.textContent = '光影集';
    heroDesc.textContent = '用镜头记录生活中的每一个瞬间，让时光在光影中永恒。';
    heroCount.textContent = `${filteredPhotos.length} 张照片`;
  } else {
    const group = monthGroups.find((g) => {
      const key = `${g.year}-${String(g.month).padStart(2, '0')}`;
      return key === activeMonth;
    });
    if (group) {
      heroTitle.textContent = group.label;
      heroDesc.textContent = `${group.label}，共 ${filteredPhotos.length} 张照片`;
      heroCount.textContent = '';
    }
  }
}

// ===== 渲染照片网格 =====
function renderPhotos() {
  photoGrid.innerHTML = '';

  filteredPhotos.forEach((photo, index) => {
    const item = document.createElement('div');
    item.className = 'photo-item';
    item.style.aspectRatio = `${photo.width} / ${photo.height}`;

    // Skeleton
    const skeleton = document.createElement('div');
    skeleton.className = 'photo-skeleton';
    item.appendChild(skeleton);

    // Image
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.width = photo.width;
    img.height = photo.height;
    img.style.aspectRatio = `${photo.width} / ${photo.height}`;
    img.style.opacity = '0';

    img.addEventListener('load', () => {
      skeleton.style.display = 'none';
      img.style.opacity = '1';
    });

    item.appendChild(img);

    // Overlay
    const overlay = document.createElement('div');
    overlay.className = 'photo-overlay';
    const title = document.createElement('div');
    title.className = 'photo-title';
    title.textContent = photo.title;
    overlay.appendChild(title);
    item.appendChild(overlay);

    // Click handler
    item.addEventListener('click', () => openLightbox(index));

    photoGrid.appendChild(item);
  });
}

// ===== 灯箱功能 =====
function openLightbox(index) {
  currentPhotoIndex = index;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function updateLightbox() {
  const photo = filteredPhotos[currentPhotoIndex];
  if (!photo) return;

  lightboxImage.src = photo.src;
  lightboxImage.alt = photo.alt;
  lightboxTitle.textContent = photo.title;
  lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${filteredPhotos.length}`;

  lightboxPrev.disabled = currentPhotoIndex === 0;
  lightboxNext.disabled = currentPhotoIndex === filteredPhotos.length - 1;
}

function goNext() {
  if (currentPhotoIndex < filteredPhotos.length - 1) {
    currentPhotoIndex++;
    updateLightbox();
  }
}

function goPrev() {
  if (currentPhotoIndex > 0) {
    currentPhotoIndex--;
    updateLightbox();
  }
}

// ===== 事件监听 =====
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', (e) => {
  e.stopPropagation();
  goPrev();
});
lightboxNext.addEventListener('click', (e) => {
  e.stopPropagation();
  goNext();
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});

// ===== 初始化 =====
renderNav();
renderHero();
renderPhotos();
