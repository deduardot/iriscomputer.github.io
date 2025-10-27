// busqueda.js (CORREGIDO Y COMPLETADO)
const productos = [
    {
        id: 'p001',
        nombre: 'RYZEN 7 4700G',
        precio: 1800,
        imagen: '../imagenes/ryzen 7 4700g.webp',
        descripcionCorta: '8 núcleos / 16 hilos / 3.6GHz Base / 4.4GHz Max Boost / Cache de L3 8MB',
        especificaciones: {
            tipo: 'CPU', // <-- AÑADIDO
            socket: 'AM4',
            stock: 15
        },
        disponibilidad: true
    },
    {
        id: 'p002',
        nombre: 'ASUS PRIME B550M-A WIFI**',
        precio: 1880,
        imagen: '../imagenes/asus prime b550 wifi.webp',
        descripcionCorta: 'Chipset B550 / Socket AM4 / Soporte para PCIe 4.0 / WiFi Integrado',
        especificaciones: {
            tipo: 'Placa madre', // <-- AÑADIDO
            formato: 'Micro-ATX',
            stock: 10
        },
        disponibilidad: true
    },
    {
        id: 'p003',
        nombre: 'MSI VENTUS 3X RTX 5080',
        precio: 25800,
        imagen: '../imagenes/ventus rtx 5080.webp',
        descripcionCorta: 'GPU de última generación / 16GB GDDR6X / Refrigeración de triple ventilador',
        especificaciones: {
            tipo: 'GPU', // <-- AÑADIDO
            interfaz: 'PCIe 4.0',
            stock: 5
        },
        disponibilidad: true
    },
    {
        id: 'p004',
        nombre: 'CORSAIR CX650 Bronze',
        precio: 898,
        imagen: '../imagenes/corsair bronze.webp',
        descripcionCorta: 'Fuente de poder 650W / Certificación 80 PLUS Bronze / Alta eficiencia',
        especificaciones: {
            tipo: 'Fuente de poder', // <-- CORREGIDO
            potencia: '650W',
            stock: 20
        },
        disponibilidad: true
    },
    {
        id: 'p005',
        nombre: 'Intel Core i5-12400F',
        precio: 2124,
        imagen: '../imagenes/intel i5 12400f.webp',
        descripcionCorta: '6 núcleos / 12 hilos / Hasta 4.4GHz / Sin gráficos integrados',
        especificaciones: {
            tipo: 'CPU', // <-- AÑADIDO
            socket: 'LGA1700',
            stock: 12
        },
        disponibilidad: true
    },
    {
        id: 'p006',
        nombre: 'CORSAIR VENGEANCE RGB WHITE 64GB DDR5',
        precio: 3141,
        imagen: '../imagenes/corsair ram64 ddr5.webp',
        descripcionCorta: '(32X2)=64GB 5200MHZ/DDR5 INTEL XMP - WHS200',
        especificaciones: {
            tipo: 'Memoria RAM', // <-- CORREGIDO
            capacidad: '64GB (2x32GB)',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p007',
        nombre: 'SEAGATE 1TB',
        precio: 475,
        imagen: '../imagenes/seagate 1tb.png',
        descripcionCorta: 'Almacenamiento confiable con velocidad de 5400 RPM y transferencia de hasta 6 Gb/s.',
        especificaciones: {
            tipo: 'Almacenamiento', // <-- CORREGIDO
            capacidad: '1TB',
            stock: 25
        },
        disponibilidad: true
    },
    {
        id: 'p008',
        nombre: 'CRUCIAL BX500 500GB',
        precio: 610,
        imagen: '../imagenes/crucial bx 500gb.png',
        descripcionCorta: 'SSD SATA CRUCIAL BX500',
        especificaciones: {
            tipo: 'Almacenamiento', // <-- CORREGIDO
            capacidad: '500GB',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p009',
        nombre: 'KINGSTON KC3000 1tb',
        precio: 1220,
        imagen: '../imagenes/kingston kc3000 1tb.png',
        descripcionCorta: 'Consumo eficiente: rendimiento superior con bajo consumo energético',
        especificaciones: {
            tipo: 'Almacenamiento', // <-- CORREGIDO
            capacidad: '1 Tb',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p010',
        nombre: 'KINGSTON A400 960GB',
        precio: 915,
        imagen: '../imagenes/kingston a400 960gb.webp',
        descripcionCorta: 'SSD SATA KINGSTON A400',
        especificaciones: {
            tipo: 'Almacenamiento', // <-- CORREGIDO
            capacidad: '960Gb',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p011',
        nombre: 'INTEL I9 12900KF',
        precio: 5627,
        imagen: '../imagenes/intel i9 12900kf.png',
        descripcionCorta: '16 NUCLEOS 24 HILOS /6 - 20GHZ MAX - BOOST/ CACHE 36 MB.',
        especificaciones: {
            tipo: 'CPU', // <-- CORREGIDO
            capacidad: '20GHZ',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p012',
        nombre: 'RYZEN 9 9950X3D',
        precio: 12240,
        imagen: '../imagenes/ryzen 9 9950x3d.png',
        descripcionCorta: 'Arquitectura: Zen 5',
        especificaciones: {
            tipo: 'CPU', // <-- CORREGIDO
            socket: 'AM5',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p013',
        nombre: 'CORSAIR RM1000e Gold',
        precio: 3108,
        imagen: '../imagenes/corsair rm1000e.webp',
        descripcionCorta: 'Fuente de poder CORSAIR RM1000e 80 PLUS Gold ATX (Cybenetics Platinum)',
        especificaciones: {
            tipo: 'Fuente de poder', // <-- CORREGIDO
            potencia: '1000W',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p014',
        nombre: 'DEEPCOOL PN850M Modular',
        precio: 2328,
        imagen: '../imagenes/deepcool pn850m.webp',
        descripcionCorta: 'DEEPCOOL PN850M Modular',
        especificaciones: {
            tipo: 'Fuente de poder', // <-- CORREGIDO
            potencia: '850W',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p015',
        nombre: 'ASUS ROG THOR 850W Platinum',
        precio: 4362,
        imagen: '../imagenes/asus rog thor850.webp',
        descripcionCorta: 'ASUS ROG THOR 850W certificada 80 PLUS Platinum',
        especificaciones: {
            tipo: 'Fuente de poder', // <-- CORREGIDO
            potencia: '850W',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p016',
        nombre: 'ROG STRIX GX601 HELIOS',
        precio: 8136,
        imagen: '../imagenes/rog strix helios.webp',
        descripcionCorta: 'Gabinete ROG STRIX GX601 HELIOS RGB - 4 ventiladores',
        especificaciones: {
            tipo: 'Gabinete', // <-- CORREGIDO
            formato: 'E-ATX',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p017',
        nombre: 'ASUSTUF GTS02',
        precio: 4836,
        imagen: '../imagenes/asustuf.webp',
        descripcionCorta: 'Gabinete ASUSTUF GTS02 con panel frontal con puerto USB 3.2 Gen 2 tipo C (hasta 10 Gbps)',
        especificaciones: {
            tipo: 'Gabinete', // <-- CORREGIDO
            formato: 'ATX',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p018',
        nombre: 'DEEPCOOL MATREXX 70',
        precio: 2079,
        imagen: '../imagenes/deepcool matrexx.webp',
        descripcionCorta: 'formato E-ATX -- ARGB -- 3 ventiladores ARGB y 1 ventilador negro',
        especificaciones: {
            tipo: 'Gabinete', // <-- CORREGIDO
            formato: 'E-ATX',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p019',
        nombre: 'COOLER MASTER MB 520',
        precio: 1356,
        imagen: '../imagenes/cooler master.webp',
        descripcionCorta: 'formato E-ATX -- 3 ventiladores ARGB y 1 ventilador negro',
        especificaciones: {
            tipo: 'Gabinete', // <-- CORREGIDO
            formato: 'E-ATX',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p020',
        nombre: 'ASUS TUF GAMING RTX 5090',
        precio: 54014,
        imagen: '../imagenes/rtx5090.png',
        descripcionCorta: 'Núcleos CUDA: 21 -- Salidas de video: 2 x HDMI 2.1b -- 3 x DisplayPort 2.1b',
        especificaciones: {
            tipo: 'GPU', // <-- CORREGIDO
            capacidad: '32 GB GDDR7',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p021',
        nombre: 'GIGABYTE RTX 5060TI',
        precio: 8452,
        imagen: '../imagenes/gigabyte5060ti.png',
        descripcionCorta: 'architecture and DLSS 4Powered by GeForce RTX™ 5060 Ti Integrated with  interface0',
        especificaciones: {
            tipo: 'GPU', // <-- CORREGIDO
            capacidad: '8GB GDDR7 128bit memory',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p022',
        nombre: 'BIOSTAR 1050Ti',
        precio: 2237,
        imagen: '../imagenes/biostar1050ti.png',
        descripcionCorta: '(32X2)=64GB 5200MHZ/DDR5 INTEL XMP - WHS200',
        especificaciones: {
            tipo: 'GPU', // <-- CORREGIDO
            capacidad: '4GB GDDR5',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p023',
        nombre: 'ALIENWARE 18 AREA-51',
        precio: 66647,
        imagen: '../imagenes/alienware 18 area51.png',
        descripcionCorta: 'PROCESADOR: INTEL CORE ULTRA 9 275HX',
        especificaciones: {
            tipo: 'Laptop', // <-- CORREGIDO
            capacidad: '2TB',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p024',
        nombre: 'LENOVO LEGION PRO 7',
        precio: 44160,
        imagen: '../imagenes/lenovo legion7.png',
        descripcionCorta: 'PROCESADOR: INTEL 19 14900HX/14VA GEN',
        especificaciones: {
            tipo: 'Laptop', // <-- CORREGIDO
            capacidad: '1 TB',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p025',
        nombre: 'ROG STRIX G614F',
        precio: 30284,
        imagen: '../imagenes/rog strix g614f.png',
        descripcionCorta: 'PROCESADOR: RYZEN 9 9955HX',
        especificaciones: {
            tipo: 'Laptop', // <-- CORREGIDO
            capacidad: '1 TB',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p026',
        nombre: 'MANTA XFINITY RGB 32GB DDR5',
        precio: 2317,
        imagen: '../imagenes/manta xfinity 32gb ddr5.webp',
        descripcionCorta: '(2X16) 32GB BK - XFINITY6800',
        especificaciones: {
            tipo: 'Memoria RAM', // <-- CORREGIDO
            capacidad: '32GB (2x16GB)',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p027',
        nombre: 'CORSAIR DOMINATOR PLATINUM RGB 32GB DDR5',
        precio: 2712,
        imagen: '../imagenes/corsair dominator platinum.webp',
        descripcionCorta: '32GB (16X2) 5600MHZ/DDS/WHITE INTEL - DOM5600WH',
        especificaciones: {
            tipo: 'Memoria RAM', // <-- CORREGIDO
            capacidad: '32GB (2x16GB)',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p028',
        nombre: 'KINGSTON FURY BEAST 32GB DDR5',
        precio: 1356,
        imagen: '../imagenes/kingston fury beast32gb.webp',
        descripcionCorta: '32GB 5600MHZ/DDR5 - HF325600RGB',
        especificaciones: {
            tipo: 'Memoria RAM', // <-- CORREGIDO
            capacidad: '32GB',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p029',
        nombre: 'Samsung SF350',
        precio: 1718,
        imagen: '../imagenes/samsung sf350.png',
        descripcionCorta: 'Samsung Modelo SF350-Monitor LED - 24" -- 1920 x 1080 Full HD (1080p)',
        especificaciones: {
            tipo: 'Monitor', // <-- CORREGIDO
            resolucion: '1080p',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p030',
        nombre: 'ASUS ROG STRIX XG27ACS',
        precio: 10373,
        imagen: '../imagenes/asus rog strix xg27acs.webp',
        descripcionCorta: '27"/QHD/180HZ/VA/SYNC IPS 1MS',
        especificaciones: {
            tipo: 'Monitor', // <-- CORREGIDO
            resolucion: 'QHD',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p031',
        nombre: 'MASTER G MGME3420G',
        precio: 6328,
        imagen: '../imagenes/master g.webp',
        descripcionCorta: '34"/FHD/165HZ/VA',
        especificaciones: {
            tipo: 'Monitor', // <-- CORREGIDO
            resolucion: 'FHD',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p032',
        nombre: 'ASUS TUF VG328H1B CURVO',
        precio: 6170,
        imagen: '../imagenes/asus tuf monitor.webp',
        descripcionCorta: '32"/FHD/165HZ/VA',
        especificaciones: {
            tipo: 'Monitor', // <-- CORREGIDO
            resolucion: 'FHD',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p033',
        nombre: 'GIGABYTE H610M K',
        precio: 1446,
        imagen: '../imagenes/placa gigabyte h610m.png',
        descripcionCorta: 'SOCKET LGA 1700/ SLOT',
        especificaciones: {
            tipo: 'Placa madre', // <-- CORREGIDO
            socket: 'LGA 1700',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p034',
        nombre: 'ASUS ROG STRIX Z890_A GAMING WIFI DRR5',
        precio: 9989,
        imagen: '../imagenes/placa asus rog strixz890.webp',
        descripcionCorta: 'SOCKET INTEL/1851 -- 4 slots RAM',
        especificaciones: {
            tipo: 'Placa madre', // <-- CORREGIDO
            socket: 'INTEL 1851',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p035',
        nombre: 'MSI PRO Z890-P WIFI',
        precio: 5966,
        imagen: '../imagenes/placa msi z890.webp',
        descripcionCorta: 'SOCKET INTEL/1851 -- 4 slots RAM',
        especificaciones: {
            tipo: 'Placa madre', // <-- CORREGIDO
            socket: 'INTEL 1851',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p036',
        nombre: 'ASUS ROG RYUJIN III 240 ARGB',
        precio: 4452,
        imagen: '../imagenes/refri asus rog 240.webp',
        descripcionCorta: 'PANTALLA LCD -- VENTILADOR ARGB',
        especificaciones: {
            tipo: 'Refrigeracion', // <-- CORREGIDO
            tamaño: '240mm',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p037',
        nombre: 'DEEPCOOL MYSTIQUE 360 RGB',
        precio: 2915,
        imagen: '../imagenes/refri deepcool mystiquergb.webp',
        descripcionCorta: 'PANTALLA LCD DE CPU/BOMBA DE QUINTA GENERACION/3',
        especificaciones: {
            tipo: 'Refrigeracion', // <-- CORREGIDO
            tamaño: '360mm',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p038',
        nombre: 'DEEPCOOL LQ360',
        precio: 2802,
        imagen: '../imagenes/refri deepcool lq360.webp',
        descripcionCorta: 'RADIADOR DE 360',
        especificaciones: {
            tipo: 'Refrigeracion', // <-- CORREGIDO
            tamaño: '360mm',
            stock: 30
        },
        disponibilidad: true
    },
    {
        id: 'p039',
        nombre: 'ASUS ROG LC II 240 BLACK',
        precio: 2938,
        imagen: '../imagenes/refri asus rog lc240.webp',
        descripcionCorta: 'DOS VENTILADORES 120MM/PANTALLA OLED /COMPATIBILIDAD AMD Y INTEL/RADIADOR 121X272X27MM/2500RPM',
        especificaciones: {
            tipo: 'Refrigeracion', // <-- CORREGIDO
            tamaño: '240mm',
            stock: 30
        },
        disponibilidad: true
    }
];