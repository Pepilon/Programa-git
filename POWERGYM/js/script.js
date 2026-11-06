let baseClientes = loadSavedData('powergym-clientes', [
            { id: 1, nombre: "Milena Patricia Gómez", documento: "105678942", correo: "milena@example.com", telefono: "+57 321 4567", plan: "Premium", estado: "Activo", fechaInicio: "2026-06-01", fechaVence: "2026-07-01" },
            { id: 2, nombre: "Carlos Alberto Varela", documento: "80456123", correo: "carlos@example.com", telefono: "+57 301 9876", plan: "Elite", estado: "Activo", fechaInicio: "2026-05-15", fechaVence: "2026-08-15" },
            { id: 3, nombre: "Jessica Andrea Marín", documento: "109485723", correo: "jessica@example.com", telefono: "+57 312 6543", plan: "Básico", estado: "Activo", fechaInicio: "2026-06-10", fechaVence: "2026-07-10" },
            { id: 4, nombre: "David Fernando López", documento: "79852146", correo: "david@example.com", telefono: "+57 310 1122", plan: "Premium", estado: "Activo", fechaInicio: "2026-04-01", fechaVence: "2026-10-01" },
            { id: 5, nombre: "Camila Torres Ruiz", documento: "103248562", correo: "camila@example.com", telefono: "+57 315 5566", plan: "Básico", estado: "Inactivo", fechaInicio: "2025-12-01", fechaVence: "2026-01-01" },
            { id: 6, nombre: "Juan Sebastián Restrepo", documento: "101048569", correo: "sebastian@example.com", telefono: "+57 318 9988", plan: "Elite", estado: "Activo", fechaInicio: "2026-06-12", fechaVence: "2026-07-12" }
        ]);

        let basePagos = [
            { id: 1, cliente: "Milena Patricia Gómez", fecha: "2026-06-01", valor: 120000, metodo: "Tarjeta de Crédito", estado: "Aprobado" },
            { id: 2, cliente: "Carlos Alberto Varela", fecha: "2026-05-15", valor: 180000, metodo: "Transferencia Bancaria", estado: "Aprobado" },
            { id: 3, cliente: "Jessica Andrea Marín", fecha: "2026-06-10", valor: 80000, metodo: "Efectivo", estado: "Aprobado" },
            { id: 4, cliente: "David Fernando López", fecha: "2026-04-01", valor: 120000, metodo: "Tarjeta de Crédito", estado: "Aprobado" },
            { id: 5, cliente: "Camila Torres Ruiz", fecha: "2025-12-01", valor: 80000, metodo: "Efectivo", estado: "Rechazado" },
            { id: 6, cliente: "Juan Sebastián Restrepo", fecha: "2026-06-12", valor: 180000, metodo: "Transferencia Bancaria", estado: "Aprobado" }
        ];

        function loadSavedData(key, fallback) {
            try {
                const saved = localStorage.getItem(key);
                return saved ? JSON.parse(saved) : fallback;
            } catch (error) {
                return fallback;
            }
        }

        function saveData(key, data) {
            try {
                localStorage.setItem(key, JSON.stringify(data));
            } catch (error) {
                triggerNotification('No fue posible guardar los cambios en este dispositivo.', 'error');
            }
        }

        function escapeHTML(value) {
            return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
        }

        let baseRutinas = loadSavedData('powergym-rutinas', [
            { id: 1, cliente: "Milena Patricia Gómez", objetivo: "Tonificación Pierna & Cardio", entrenador: "Laura Restrepo", duracion: "8 Semanas", ejercicios: ["Sentadilla con barra", "Prensa de piernas", "Caminata en cinta"], estado: "Vigente" },
            { id: 2, cliente: "Carlos Alberto Varela", objetivo: "Hipertrofia Fuerza Tren Superior", entrenador: "Carlos Mendoza", duracion: "12 Semanas", ejercicios: ["Press de banca", "Remo con barra", "Press militar"], estado: "Vigente" },
            { id: 3, cliente: "Jessica Andrea Marín", objetivo: "Resistencia Cardiovascular", entrenador: "Felipe Osorio", duracion: "4 Semanas", ejercicios: ["Remo ergómetro", "Burpee", "Plancha"], estado: "Completado" },
            { id: 4, cliente: "David Fernando López", objetivo: "Pérdida de Peso y Core", entrenador: "Laura Restrepo", duracion: "6 Semanas", ejercicios: ["Peso muerto rumano", "Zancadas", "Pallof press"], estado: "Vigente" }
        ]);

        const exerciseCatalog = [
            { category: 'Pecho', type: 'Fuerza', exercises: ['Press de banca plano', 'Press inclinado con barra', 'Press inclinado con mancuernas', 'Press declinado', 'Aperturas con mancuernas', 'Cruce de poleas', 'Fondos inclinados', 'Press en máquina', 'Pullover con mancuerna', 'Press con agarre cerrado', 'Flexiones', 'Press unilateral en polea'] },
            { category: 'Espalda', type: 'Fuerza', exercises: ['Peso muerto convencional', 'Remo con barra', 'Remo con mancuerna', 'Jalón al pecho', 'Dominadas', 'Remo sentado en polea', 'Pullover en polea', 'Rack pull', 'Face pull', 'Remo en máquina con apoyo', 'Jalón con agarre estrecho', 'Hiperextensiones'] },
            { category: 'Hombros', type: 'Fuerza', exercises: ['Press militar', 'Press Arnold', 'Elevaciones laterales', 'Elevaciones frontales', 'Pájaros con mancuernas', 'Remo al mentón', 'Encogimientos de hombros'] },
            { category: 'Bíceps', type: 'Fuerza', exercises: ['Curl con barra', 'Curl alterno con mancuernas', 'Curl martillo', 'Curl predicador', 'Curl en polea', 'Curl concentrado'] },
            { category: 'Tríceps', type: 'Fuerza', exercises: ['Extensión en polea', 'Press francés', 'Fondos en paralelas', 'Extensión por encima de la cabeza', 'Patada de tríceps', 'Press banca con agarre cerrado'] },
            { category: 'Piernas y glúteos', type: 'Fuerza', exercises: ['Sentadilla con barra', 'Prensa de piernas', 'Peso muerto rumano', 'Zancadas caminando', 'Hip thrust', 'Extensión de cuádriceps', 'Curl femoral', 'Sentadilla búlgara', 'Elevación de gemelos', 'Abducción de cadera'] },
            { category: 'Core', type: 'Fuerza', exercises: ['Plancha frontal', 'Plancha lateral', 'Crunch en polea', 'Elevación de piernas', 'Pallof press', 'Ab wheel', 'Dead bug'] },
            { category: 'Cardio', type: 'Fuerza', exercises: ['Caminata en cinta', 'Carrera en cinta', 'Bicicleta estática', 'Elíptica', 'Remo ergómetro', 'Escaladora'] },
            { category: 'Pantorrillas', type: 'Fuerza', exercises: ['Elevación de gemelos de pie', 'Elevación de gemelos sentado', 'Gemelo en prensa', 'Elevación unilateral de talón', 'Tibialis raise'] },
            { category: 'Antebrazos y agarre', type: 'Fuerza', exercises: ['Curl de muñeca', 'Curl de muñeca inverso', 'Paseo del granjero', 'Dead hang', 'Pinza con discos'] },
            { category: 'Movilidad y activación', type: 'Preparación', exercises: ['Rotación torácica', 'Movilidad de tobillo', 'Estiramiento dinámico de cadera', 'Band pull-apart', 'Puente de glúteos', 'Bird dog', 'Rotación externa con banda'] },
            { category: 'CrossFit · Principiante', type: 'CrossFit', exercises: ['Air squat', 'Peso muerto con kettlebell', 'Remo ergómetro', 'Salto de cuerda simple', 'Push-up elevado', 'Ring row', 'Kettlebell swing ruso', 'Farmer carry', 'Goblet squat', 'Step-up bajo'] },
            { category: 'CrossFit · Intermedio', type: 'CrossFit', exercises: ['Burpee', 'Box jump', 'Wall ball', 'Toes to bar (progresión)', 'Clean con barra', 'Push press', 'Double unders', 'Snatch con mancuerna', 'Pull-up estricto', 'Kettlebell swing americano', 'Handstand hold'] },
            { category: 'CrossFit · Avanzado', type: 'CrossFit', exercises: ['Muscle-up en anillas', 'Bar muscle-up', 'Handstand push-up', 'Squat snatch', 'Clean and jerk', 'Pistol squat', 'Rope climb', 'Handstand walk', 'Thruster con barra', 'Squat clean', 'Ring dip estricto'] }
        ];

        function defaultExercise(name, category = 'General') {
            return { nombre: name, categoria: category, series: 4, repeticiones: '8-12', carga: 0, rpe: 8, descanso: 90 };
        }

        function normalizeRoutine(routine) {
            if (Array.isArray(routine.dias) && routine.dias.length) return routine;
            const legacy = Array.isArray(routine.ejercicios) ? routine.ejercicios : [];
            const days = Math.min(6, Math.max(1, Number(routine.diasSemana) || Math.min(3, Math.max(1, legacy.length))));
            return {
                ...routine,
                diasSemana: days,
                dias: Array.from({ length: days }, (_, index) => ({
                    numero: index + 1,
                    enfoque: index === 0 ? routine.objetivo || 'Día 1' : `Día ${index + 1}`,
                    ejercicios: legacy.filter((_, exerciseIndex) => exerciseIndex % days === index).map(name => defaultExercise(name))
                }))
            };
        }

        baseRutinas = baseRutinas.map(normalizeRoutine);
        let routineDraftDays = [];
        let routineEditingExercise = null;
        let activeUser = { role: 'Administrador', name: 'Andrés Felipe Osorio Aguirre', clientId: null };
        let savedProfiles = loadSavedData('powergym-perfiles', {});
        const defaultProfilePhoto = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200';

        const foodCatalog = {
            avena: { name: 'Avena en hojuelas (seca)', carbs: 66.3, protein: 16.9, fat: 6.9 },
            arroz: { name: 'Arroz blanco cocido', carbs: 28.2, protein: 2.7, fat: 0.3 },
            papa: { name: 'Papa cocida', carbs: 20.1, protein: 1.9, fat: 0.1 },
            platano: { name: 'Banano', carbs: 22.8, protein: 1.1, fat: 0.3 },
            pollo: { name: 'Pechuga de pollo cocida', carbs: 0, protein: 31, fat: 3.6 },
            huevo: { name: 'Huevo entero', carbs: 0.7, protein: 12.6, fat: 9.5 },
            atun: { name: 'Atún en agua escurrido', carbs: 0, protein: 25.5, fat: 0.8 },
            lentejas: { name: 'Lentejas cocidas', carbs: 20.1, protein: 9, fat: 0.4 },
            aguacate: { name: 'Aguacate', carbs: 8.5, protein: 2, fat: 14.7 },
            yogur: { name: 'Yogur griego natural', carbs: 3.6, protein: 10, fat: 0.4 },
            almendras: { name: 'Almendras', carbs: 21.6, protein: 21.2, fat: 49.9 },
            salmon: { name: 'Salmón cocido', carbs: 0, protein: 22.1, fat: 12.4 },
            cafe: { name: 'Café negro preparado, sin azúcar', carbs: 0, protein: 0.1, fat: 0 },
            lechuga: { name: 'Lechuga', carbs: 2.9, protein: 1.4, fat: 0.2 },
            tomate: { name: 'Tomate', carbs: 3.9, protein: 0.9, fat: 0.2 },
            pan: { name: 'Pan integral', carbs: 41.3, protein: 12.5, fat: 4.2 },
            leche: { name: 'Leche semidescremada', carbs: 4.8, protein: 3.4, fat: 1.7 },
            res: { name: 'Carne magra de res cocida', carbs: 0, protein: 26, fat: 10 },
            frijoles: { name: 'Fríjoles cocidos', carbs: 23.7, protein: 8.7, fat: 0.5 },
            aceite: { name: 'Aceite de oliva', carbs: 0, protein: 0, fat: 100 }
        };

        const nutritionFoodGroups = {
            Carbohidratos: ['avena', 'arroz', 'papa', 'platano', 'lentejas', 'frijoles', 'pan'],
            Proteínas: ['pollo', 'huevo', 'atun', 'lentejas', 'yogur', 'salmon', 'res', 'frijoles'],
            Grasas: ['aguacate', 'huevo', 'almendras', 'salmon', 'aceite'],
            'Bebidas y vegetales': ['cafe', 'lechuga', 'tomate', 'leche']
        };

        let nutritionPlans = loadSavedData('powergym-nutricion', [
            { id: 1, cliente: 'Milena Patricia Gómez', objetivo: 'Déficit', comida: 'Desayuno', alimento: 'avena', gramos: 50 },
            { id: 2, cliente: 'Carlos Alberto Varela', objetivo: 'Mantenimiento', comida: 'Almuerzo', alimento: 'pollo', gramos: 150 },
            { id: 3, cliente: 'Jessica Andrea Marín', objetivo: 'Superávit', comida: 'Merienda', alimento: 'yogur', gramos: 200 }
        ]);
        function normalizeNutritionPlans(records) {
            const mealIdsBySlot = new Map();
            return records.map(record => {
                const day = record.dia || 'Lunes';
                const slot = [record.cliente, record.objetivo, day, record.comida].join('|');
                if (!mealIdsBySlot.has(slot)) mealIdsBySlot.set(slot, record.mealId || `meal-${record.id}`);
                return { ...record, dia: day, mealId: mealIdsBySlot.get(slot) };
            });
        }
        nutritionPlans = normalizeNutritionPlans(nutritionPlans);
        let progressRecords = loadSavedData('powergym-seguimiento', [
            { id: 1, cliente: 'Milena Patricia Gómez', fecha: '2026-10-01', peso: 62.4, cintura: 73, grasa: 25.1 },
            { id: 2, cliente: 'Carlos Alberto Varela', fecha: '2026-10-05', peso: 81.2, cintura: 88, grasa: 18.4 }
        ]);
        let routineEditingId = null;
        let nutritionEditingId = null;
        let nutritionDraftFoods = [];
        let nutritionDraftEditingIndex = null;
        let trackingEditingId = null;

        let myBarChart = null;
        let myPieChart = null;

        function switchView(viewName) {
            document.getElementById('landing-page').classList.add('hidden');
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('admin-layout').classList.add('hidden');

            if (viewName === 'landing') {
                document.getElementById('landing-page').classList.remove('hidden');
            } else if (viewName === 'login') {
                document.getElementById('login-page').classList.remove('hidden');
            } else if (viewName === 'admin') {
                document.getElementById('admin-layout').classList.remove('hidden');
                switchAdminPanel(activeUser.role === 'Cliente' ? 'mi-plan' : 'dashboard');
            }
        }

        function switchAdminPanel(panelId) {
            if (activeUser.role === 'Cliente' && !['mi-plan', 'perfil'].includes(panelId)) panelId = 'mi-plan';
            if (activeUser.role !== 'Cliente' && panelId === 'mi-plan') panelId = 'dashboard';
            const subPaneles = ['dashboard', 'clientes', 'membresias', 'pagos', 'rutinas', 'nutricion', 'mi-plan', 'perfil', 'evidencia'];
            subPaneles.forEach(p => {
                const el = document.getElementById('panel-' + p);
                if (el) el.classList.add('hidden');
                
                const link = document.getElementById('sidebar-' + p);
                if (link) {
                    link.classList.remove('bg-white/10', 'text-white', 'border-l-4', 'border-pgOrange');
                    link.classList.add('text-gray-300', 'hover:bg-white/5');
                }
            });

            const targetPanel = document.getElementById('panel-' + panelId);
            if (targetPanel) targetPanel.classList.remove('hidden');

            const activeLink = document.getElementById('sidebar-' + panelId);
            if (activeLink) {
                activeLink.classList.remove('text-gray-300', 'hover:bg-white/5');
                activeLink.classList.add('bg-white/10', 'text-white', 'border-l-4', 'border-pgOrange');
            }

            if (panelId === 'dashboard') {
                initCharts();
                actualizarKPIs();
            } else if (panelId === 'clientes') {
                renderClientesTable(baseClientes);
            } else if (panelId === 'membresias') {
                renderMembresiasTable();
                actualizarContadoresMembresias();
            } else if (panelId === 'pagos') {
                renderPagosTable(basePagos);
                actualizarKpisPagos();
            } else if (panelId === 'rutinas') {
                renderRutinasTable();
                renderExerciseCatalog();
            } else if (panelId === 'nutricion') {
                renderNutritionPlans();
                renderTrackingTable();
            } else if (panelId === 'mi-plan') {
                renderClientPlans();
            } else if (panelId === 'perfil') {
                renderUserProfile();
            }

            const aside = document.querySelector('aside');
            if (window.innerWidth < 768) {
                aside.classList.add('hidden');
            }
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value.trim().toLowerCase();
            const pass = document.getElementById('login-password').value.trim();
            const staffAccounts = [
                { email: 'admin@powergym.com', role: 'Administrador', name: 'Andrés Felipe Osorio Aguirre', phone: '+57 (312) 456-7890' },
                { email: 'instructor@powergym.com', role: 'Instructor', name: 'Laura Restrepo', phone: '+57 300 000 0000' }
            ];
            const staff = staffAccounts.find(account => account.email === email
                || savedProfiles[`staff:${account.email}`]?.email?.toLowerCase() === email);
            const client = baseClientes.find(item => item.correo.toLowerCase() === email);
            const user = staff
                ? { ...staff, shortName: staff.name.split(' ').slice(0, 2).join(' '), profileKey: `staff:${staff.email}`, loginEmail: staff.email }
                : (client ? { role: 'Cliente', name: client.nombre, shortName: client.nombre, clientId: client.id, profileKey: `client:${client.id}`, loginEmail: client.correo } : null);

            if (user && pass === '123456') {
                const clientData = user.clientId ? baseClientes.find(item => item.id === user.clientId) : null;
                const saved = savedProfiles[user.profileKey] || {};
                const profile = {
                    name: clientData?.nombre || saved.name || user.name,
                    email: clientData?.correo || saved.email || user.email,
                    phone: clientData?.telefono || saved.phone || user.phone || '',
                    location: saved.location || 'Sede El Poblado',
                    photo: saved.photo || defaultProfilePhoto,
                    createdAt: saved.createdAt || clientData?.fechaInicio || new Date().toISOString().slice(0, 10)
                };
                activeUser = { ...user, profile };
                applyProfileToUI(profile);
                document.getElementById('sidebar-user-role').textContent = user.role;
                ['dashboard', 'clientes', 'membresias', 'pagos', 'rutinas', 'nutricion'].forEach(panel => {
                    document.getElementById(`sidebar-${panel}`).classList.toggle('hidden', user.role === 'Cliente');
                });
                document.getElementById('sidebar-perfil').classList.remove('hidden');
                document.getElementById('sidebar-mi-plan').classList.toggle('hidden', user.role !== 'Cliente');
                triggerNotification('¡Acceso concedido! Bienvenido a Power Gym.', 'success');
                switchView('admin');
            } else {
                triggerNotification('Correo o contraseña incorrectos. Consulta tus datos de acceso con el gimnasio.', 'error');
            }
        }

        function handleLogout() {
            triggerNotification('Sesión finalizada correctamente.', 'info');
            activeUser = { role: 'Administrador', name: 'Andrés Felipe Osorio Aguirre', clientId: null };
            switchView('landing');
        }

        function renderClientesTable(data) {
            const tbody = document.getElementById('clientes-table-body');
            tbody.innerHTML = '';

            data.forEach(c => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50/50 transition';
                
                const badgeStyle = c.estado === 'Activo' 
                    ? 'bg-green-50 text-green-600 border-green-100' 
                    : 'bg-red-50 text-red-500 border-red-100';

                tr.innerHTML = `
                    <td class="px-6 py-4 font-bold text-pgBlue-dark flex items-center gap-2">
                        <div class="w-7 h-7 rounded-full bg-pgBlue/5 text-pgBlue flex items-center justify-center font-bold text-[10px] uppercase">
                            ${c.nombre.charAt(0)}
                        </div>
                        ${c.nombre}
                    </td>
                    <td class="px-6 py-4 font-mono text-gray-500">${c.documento}</td>
                    <td class="px-6 py-4 text-gray-400">${c.correo}</td>
                    <td class="px-6 py-4 text-gray-500">${c.telefono}</td>
                    <td class="px-6 py-4">
                        <span class="inline-block bg-pgBlue/5 text-pgBlue border border-pgBlue/10 px-2.5 py-0.5 rounded-lg text-[10px] font-bold">
                            ${c.plan}
                        </span>
                    </td>
                    <td class="px-6 py-4">
                        <span class="inline-block border px-2 py-0.5 rounded-lg text-[9px] font-bold ${badgeStyle}">
                            ${c.estado}
                        </span>
                    </td>
                    <td class="px-6 py-4 text-right space-x-1 whitespace-nowrap">
                        <button onclick="verCliente(${c.id})" class="text-gray-400 hover:text-pgBlue transition p-1"><i class="fa-regular fa-eye"></i></button>
                        <button onclick="triggerNotification('El módulo de edición estará disponible en producción.', 'info')" class="text-gray-400 hover:text-pgOrange transition p-1"><i class="fa-regular fa-pen-to-square"></i></button>
                        <button onclick="eliminarCliente(${c.id})" class="text-gray-400 hover:text-red-500 transition p-1"><i class="fa-regular fa-trash-can"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            document.getElementById('clientes-total').textContent = data.length;
            document.getElementById('clientes-range').textContent = data.length > 0 ? `1-${data.length}` : '0-0';
        }

        function registrarCliente(event) {
            event.preventDefault();
            const nombre = document.getElementById('modal-cliente-nombre').value.trim();
            const doc = document.getElementById('modal-cliente-doc').value.trim();
            const tel = document.getElementById('modal-cliente-tel').value.trim();
            const correo = document.getElementById('modal-cliente-correo').value.trim();
            const plan = document.getElementById('modal-cliente-plan').value;
            const estado = document.getElementById('modal-cliente-estado').value;

            const nuevo = {
                id: Date.now(),
                nombre,
                documento: doc,
                telefono: tel,
                correo,
                plan,
                estado,
                fechaInicio: new Date().toISOString().split('T')[0],
                fechaVence: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]
            };

            baseClientes.unshift(nuevo);
            renderClientesTable(baseClientes);
            closeModal('cliente-modal');
            triggerNotification('¡Cliente registrado con éxito en el sistema!', 'success');
            event.target.reset();
        }

        function applyProfileToUI(profile) {
            const shortName = profile.name.split(' ').slice(0, 2).join(' ');
            document.getElementById('admin-user-name').textContent = profile.name;
            document.getElementById('sidebar-user-name').textContent = shortName;
            document.getElementById('profile-user-name').textContent = profile.name;
            document.getElementById('profile-user-role').textContent = activeUser.role === 'Administrador' ? 'Administrador General' : activeUser.role;
            document.getElementById('profile-photo-preview').src = profile.photo;
            document.querySelectorAll('.profile-avatar').forEach(image => {
                image.src = profile.photo;
                image.alt = `Foto de ${profile.name}`;
            });
            document.getElementById('profile-name-input').value = profile.name;
            document.getElementById('profile-email-input').value = profile.email;
            document.getElementById('profile-phone-input').value = profile.phone;
            document.getElementById('profile-location-input').value = profile.location;
            document.getElementById('profile-created-at').textContent = new Date(profile.createdAt).toLocaleDateString('es-CO');
        }

        function renderUserProfile() {
            if (activeUser.profile) applyProfileToUI(activeUser.profile);
        }

        function previewProfilePhoto(event) {
            const file = event.target.files?.[0];
            if (!file) return;
            if (!file.type.startsWith('image/') || file.size > 5 * 1024 * 1024) {
                event.target.value = '';
                triggerNotification('Selecciona una imagen válida de máximo 5 MB.', 'error');
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                    const scale = Math.min(1, 600 / Math.max(image.width, image.height));
                    const canvas = document.createElement('canvas');
                    canvas.width = Math.round(image.width * scale);
                    canvas.height = Math.round(image.height * scale);
                    canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
                    activeUser.pendingPhoto = canvas.toDataURL('image/jpeg', 0.82);
                    document.getElementById('profile-photo-preview').src = activeUser.pendingPhoto;
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        }

        function removeProfilePhoto() {
            activeUser.pendingPhoto = '';
            document.getElementById('profile-photo-preview').src = defaultProfilePhoto;
            document.getElementById('profile-photo-file').value = '';
        }

        function resetProfileForm() {
            if (!activeUser.profile) return;
            activeUser.pendingPhoto = null;
            document.getElementById('profile-photo-file').value = '';
            applyProfileToUI(activeUser.profile);
        }

        function saveUserProfile(event) {
            event.preventDefault();
            const name = document.getElementById('profile-name-input').value.trim();
            const email = document.getElementById('profile-email-input').value.trim().toLowerCase();
            const phone = document.getElementById('profile-phone-input').value.trim();
            const location = document.getElementById('profile-location-input').value.trim();
            const photo = activeUser.pendingPhoto === '' ? defaultProfilePhoto : (activeUser.pendingPhoto || activeUser.profile.photo);
            if (!name || !email) return;

            const client = activeUser.clientId ? baseClientes.find(item => item.id === activeUser.clientId) : null;
            if (client) {
                const duplicate = baseClientes.some(item => item.id !== client.id && item.correo.toLowerCase() === email);
                if (duplicate) {
                    triggerNotification('Ese correo ya está asociado a otro cliente.', 'error');
                    return;
                }
                const previousName = client.nombre;
                client.nombre = name;
                client.correo = email;
                client.telefono = phone;
                baseRutinas = baseRutinas.map(item => item.cliente === previousName ? { ...item, cliente: name } : item);
                nutritionPlans = nutritionPlans.map(item => item.cliente === previousName ? { ...item, cliente: name } : item);
                progressRecords = progressRecords.map(item => item.cliente === previousName ? { ...item, cliente: name } : item);
                saveData('powergym-clientes', baseClientes);
                saveData('powergym-rutinas', baseRutinas);
                saveData('powergym-nutricion', nutritionPlans);
                saveData('powergym-seguimiento', progressRecords);
            }

            activeUser.name = name;
            activeUser.shortName = name.split(' ').slice(0, 2).join(' ');
            activeUser.profile = { ...activeUser.profile, name, email, phone, location, photo };
            savedProfiles[activeUser.profileKey] = activeUser.profile;
            saveData('powergym-perfiles', savedProfiles);
            activeUser.pendingPhoto = null;
            applyProfileToUI(activeUser.profile);
            if (activeUser.role === 'Cliente') renderClientPlans();
            triggerNotification('Perfil actualizado correctamente.', 'success');
        }

        function handleLogout() {
            triggerNotification('Sesión finalizada correctamente.', 'info');
            activeUser = { role: 'Administrador', name: 'Andrés Felipe Osorio Aguirre', clientId: null };
            switchView('landing');
        }

        function renderMembresiasTable() {
            const tbody = document.getElementById('membresias-table-body');
            tbody.innerHTML = '';
            baseClientes.forEach(c => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50/50 transition';
                const badge = c.estado === 'Activo' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-500 border-red-100';

                tr.innerHTML = `
                    <td class="px-6 py-4 font-bold text-pgBlue-dark">${c.nombre}</td>
                    <td class="px-6 py-4">
                        <span class="bg-pgOrange/5 text-pgOrange px-2 py-0.5 rounded-lg font-bold">${c.plan}</span>
                    </td>
                    <td class="px-6 py-4 text-gray-500 font-mono">${c.fechaInicio}</td>
                    <td class="px-6 py-4 text-gray-500 font-mono">${c.fechaVence}</td>
                    <td class="px-6 py-4">
                        <span class="border px-2 py-0.5 rounded-lg text-[9px] font-bold ${badge}">${c.estado}</span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button onclick="triggerNotification('Módulo de acciones de membresía simulado.', 'info')" class="text-pgBlue font-bold hover:underline">Renovar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function actualizarContadoresMembresias() {
            const basico = baseClientes.filter(c => c.plan === 'Básico').length;
            const premium = baseClientes.filter(c => c.plan === 'Premium').length;
            const elite = baseClientes.filter(c => c.plan === 'Elite').length;

            document.getElementById('subscritos-basico').textContent = `${basico} Suscriptores`;
            document.getElementById('subscritos-premium').textContent = `${premium} Suscriptores`;
            document.getElementById('subscritos-elite').textContent = `${elite} Suscriptores`;
        }

        function registrarMembresia(event) {
            event.preventDefault();
            const idC = parseInt(document.getElementById('modal-membresia-cliente').value);
            const plan = document.getElementById('modal-membresia-plan').value;

            const c = baseClientes.find(cli => cli.id === idC);
            if (c) {
                c.plan = plan;
                c.fechaInicio = new Date().toISOString().split('T')[0];
                c.fechaVence = new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0];
                c.estado = 'Activo';

                renderMembresiasTable();
                actualizarContadoresMembresias();
                closeModal('membresia-modal');
                triggerNotification(`¡Plan ${plan} asignado correctamente a ${c.nombre}!`, 'success');
            }
        }

        function renderPagosTable(data) {
            const tbody = document.getElementById('pagos-table-body');
            tbody.innerHTML = '';

            data.forEach(p => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50/50 transition';
                const badge = p.estado === 'Aprobado' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-500 border-red-100';

                tr.innerHTML = `
                    <td class="px-6 py-4 font-bold text-pgBlue-dark">${p.cliente}</td>
                    <td class="px-6 py-4 text-gray-500 font-mono">${p.fecha}</td>
                    <td class="px-6 py-4 font-bold text-pgBlue-dark">$${p.valor.toLocaleString()}</td>
                    <td class="px-6 py-4 text-gray-400"><i class="fa-regular fa-credit-card mr-1"></i> ${p.metodo}</td>
                    <td class="px-6 py-4">
                        <span class="border px-2 py-0.5 rounded-lg text-[9px] font-bold ${badge}">${p.estado}</span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button onclick="imprimirRecibo(${p.id})" class="text-pgBlue font-bold hover:underline">Recibo</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function actualizarKpisPagos() {
            const aprobados = basePagos.filter(p => p.estado === 'Aprobado');
            const total = aprobados.reduce((acc, curr) => acc + curr.valor, 0);
            
            document.getElementById('pagos-ingresos-mes').textContent = `$${total.toLocaleString()}`;
            document.getElementById('pagos-total-historico').textContent = `$${(total + 18500000).toLocaleString()}`;
        }

        function registrarPago(event) {
            event.preventDefault();
            const cliId = parseInt(document.getElementById('modal-pago-cliente').value);
            const val = parseInt(document.getElementById('modal-pago-valor').value);
            const met = document.getElementById('modal-pago-metodo').value;

            const c = baseClientes.find(cli => cli.id === cliId);
            if(c) {
                const nuevo = {
                    id: Date.now(),
                    cliente: c.nombre,
                    fecha: new Date().toISOString().split('T')[0],
                    valor: val,
                    metodo: met,
                    estado: 'Aprobado'
                };
                basePagos.unshift(nuevo);
                renderPagosTable(basePagos);
                actualizarKpisPagos();
                closeModal('pago-modal');
                triggerNotification('¡Transacción financiera procesada con éxito!', 'success');
            }
        }

        function imprimirRecibo(id) {
            const p = basePagos.find(pag => pag.id === id);
            if(p) {
                triggerNotification(`Recibo PDF simulado generado para ${p.cliente} por valor de $${p.valor.toLocaleString()}.`, 'success');
            }
        }

        function filtrarPagos() {
            const q = document.getElementById('pagos-search').value.toLowerCase();
            const res = basePagos.filter(p => p.cliente.toLowerCase().includes(q));
            renderPagosTable(res);
        }

        function renderRutinasTable() {
            const tbody = document.getElementById('rutinas-table-body');
            tbody.innerHTML = '';

            baseRutinas.forEach(r => {
                const tr = document.createElement('tr');
                tr.className = 'hover:bg-gray-50/50 transition';
                const exerciseCount = (r.dias || []).reduce((total, day) => total + (day.ejercicios || []).length, 0);
                tr.innerHTML = `
                    <td class="px-5 py-4 font-bold text-pgBlue-dark">${escapeHTML(r.cliente)}</td>
                    <td class="px-5 py-4 text-gray-600">${escapeHTML(r.objetivo)}</td>
                    <td class="px-5 py-4 text-gray-500">${escapeHTML(r.entrenador)}</td>
                    <td class="px-5 py-4 text-gray-500">${escapeHTML(r.duracion)}</td>
                    <td class="px-5 py-4 text-gray-500">${r.diasSemana || r.dias.length}</td>
                    <td class="px-5 py-4 text-gray-500">${exerciseCount}</td>
                    <td class="px-5 py-4 text-right whitespace-nowrap space-x-2">
                        <button onclick="editarRutina(${r.id})" class="text-pgBlue hover:text-pgBlue-dark font-bold" title="Editar rutina">Editar</button>
                        <button onclick="eliminarRutina(${r.id})" class="text-red-600 hover:text-red-700 font-bold" title="Eliminar rutina">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function renderExerciseCatalog() {
            const container = document.getElementById('exercise-catalog');
            if (!container) return;
            const query = (document.getElementById('exercise-search')?.value || '').trim().toLocaleLowerCase('es');
            const groups = exerciseCatalog.map(group => {
                const matches = group.exercises.filter(name => name.toLocaleLowerCase('es').includes(query));
                if (!matches.length) return '';
                return `<details class="exercise-group bg-white border border-gray-100 rounded-xl shadow-sm" ${query ? 'open' : ''}>
                    <summary class="cursor-pointer list-none flex items-center justify-between gap-3 px-5 py-4 font-bold text-pgBlue-dark">
                        <span>${escapeHTML(group.category)} <span class="ml-2 text-xs font-medium text-gray-400">${matches.length} ejercicios</span></span>
                        <span class="text-pgOrange text-sm">${escapeHTML(group.type)}</span>
                    </summary>
                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 px-5 pb-5">
                        ${matches.map(name => `<div class="flex items-center justify-between gap-3 rounded-lg bg-gray-50 px-3 py-3 text-sm"><span class="text-gray-700">${escapeHTML(name)}</span><button type="button" onclick="addExerciseToRoutine('${encodeURIComponent(name)}')" class="shrink-0 rounded-lg border border-pgBlue/20 px-3 py-1.5 text-xs font-bold text-pgBlue hover:bg-pgBlue hover:text-white">Añadir</button></div>`).join('')}
                    </div>
                </details>`;
            }).filter(Boolean);
            container.innerHTML = groups.length ? groups.join('') : '<p class="rounded-xl bg-white p-5 text-sm text-gray-500">No se encontraron ejercicios con esa búsqueda.</p>';
        }

        function addExerciseToRoutine(encodedName) {
            if (activeUser.role === 'Cliente') return;
            const name = decodeURIComponent(encodedName);
            openModal('rutina-modal');
            const group = exerciseCatalog.find(item => item.exercises.includes(name));
            if (group) document.getElementById('routine-muscle-select').value = group.category;
            populateRoutineExercises();
            document.getElementById('routine-exercise-select').value = name;
            addStructuredExercise();
        }

        function populateRoutineCategories() {
            const select = document.getElementById('routine-muscle-select');
            select.innerHTML = exerciseCatalog.map(group => `<option value="${escapeHTML(group.category)}">${escapeHTML(group.category)}</option>`).join('');
            populateRoutineExercises();
        }

        function populateRoutineExercises() {
            const group = exerciseCatalog.find(item => item.category === document.getElementById('routine-muscle-select').value);
            const select = document.getElementById('routine-exercise-select');
            select.innerHTML = (group?.exercises || []).map(name => `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`).join('');
        }

        function configureRoutineDays() {
            const count = Number(document.getElementById('routine-days-per-week').value);
            const previousDays = new Map(routineDraftDays.map(day => [day.numero, day]));
            routineDraftDays = Array.from({ length: count }, (_, index) => previousDays.get(index + 1) || {
                numero: index + 1,
                enfoque: `Día ${index + 1}`,
                ejercicios: []
            });
            const select = document.getElementById('routine-day-select');
            const currentDay = Math.min(Number(select.value) || 1, count);
            select.innerHTML = routineDraftDays.map(day => `<option value="${day.numero}">Día ${day.numero}</option>`).join('');
            select.value = String(currentDay);
            renderRoutineDraft();
        }

        function updateRoutineDayFocus() {
            const day = routineDraftDays.find(item => item.numero === Number(document.getElementById('routine-day-select').value));
            if (day) day.enfoque = document.getElementById('routine-day-focus').value.trim() || `Día ${day.numero}`;
            renderRoutineDraft();
        }

        function renderRoutineDraft() {
            const selectedDay = Number(document.getElementById('routine-day-select')?.value || 1);
            const activeDay = routineDraftDays.find(day => day.numero === selectedDay);
            const focusInput = document.getElementById('routine-day-focus');
            if (focusInput && activeDay && document.activeElement !== focusInput) focusInput.value = activeDay.enfoque;
            const container = document.getElementById('routine-draft-list');
            if (!container) return;
            container.innerHTML = routineDraftDays.map(day => `<details class="rounded-xl border border-gray-100 bg-white" ${day.numero === selectedDay ? 'open' : ''}>
                <summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold text-pgBlue-dark"><span>Día ${day.numero} · ${escapeHTML(day.enfoque)}</span><span class="text-xs font-semibold text-gray-400">${day.ejercicios.length} ejercicios</span></summary>
                <div class="space-y-2 px-4 pb-4">${day.ejercicios.length ? day.ejercicios.map((exercise, index) => `<div class="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"><div><strong class="text-gray-800">${escapeHTML(exercise.nombre)}</strong><p class="text-xs text-gray-500">${exercise.series} series · ${escapeHTML(exercise.repeticiones)} reps · ${exercise.carga} kg · RPE ${exercise.rpe} · ${exercise.descanso} s descanso</p></div><div class="flex gap-3"><button type="button" onclick="editRoutineExercise(${day.numero}, ${index})" class="self-start text-xs font-bold text-pgBlue">Editar</button><button type="button" onclick="removeRoutineExercise(${day.numero}, ${index})" class="self-start text-xs font-bold text-red-600">Quitar</button></div></div>`).join('') : '<p class="text-sm text-gray-400">Aún no hay ejercicios asignados a este día.</p>'}</div>
            </details>`).join('');
        }

        function addStructuredExercise() {
            if (activeUser.role === 'Cliente') return;
            const dayNumber = routineEditingExercise?.dayNumber || Number(document.getElementById('routine-day-select').value);
            const day = routineDraftDays.find(item => item.numero === dayNumber);
            const name = document.getElementById('routine-exercise-select').value;
            const category = document.getElementById('routine-muscle-select').value;
            if (!day || !name) return;
            day.enfoque = document.getElementById('routine-day-focus').value.trim() || day.enfoque;
            const exercise = {
                nombre: name,
                categoria: category,
                series: Number(document.getElementById('routine-exercise-sets').value),
                repeticiones: document.getElementById('routine-exercise-reps').value.trim(),
                carga: Number(document.getElementById('routine-exercise-load').value),
                rpe: Number(document.getElementById('routine-exercise-rpe').value),
                descanso: Number(document.getElementById('routine-exercise-rest').value)
            };
            if (routineEditingExercise && routineEditingExercise.dayNumber === dayNumber) {
                day.ejercicios[routineEditingExercise.index] = exercise;
            } else {
                day.ejercicios.push(exercise);
            }
            routineEditingExercise = null;
            document.getElementById('routine-add-exercise').textContent = 'Añadir ejercicio al día';
            renderRoutineDraft();
        }

        function editRoutineExercise(dayNumber, exerciseIndex) {
            if (activeUser.role === 'Cliente') return;
            const day = routineDraftDays.find(item => item.numero === dayNumber);
            const exercise = day?.ejercicios[exerciseIndex];
            if (!exercise) return;
            const group = exerciseCatalog.find(item => item.category === exercise.categoria) || exerciseCatalog.find(item => item.exercises.includes(exercise.nombre));
            routineEditingExercise = { dayNumber, index: exerciseIndex };
            document.getElementById('routine-day-select').value = String(dayNumber);
            document.getElementById('routine-day-focus').value = day.enfoque;
            document.getElementById('routine-muscle-select').value = group?.category || exerciseCatalog[0].category;
            populateRoutineExercises();
            document.getElementById('routine-exercise-select').value = exercise.nombre;
            document.getElementById('routine-exercise-sets').value = exercise.series;
            document.getElementById('routine-exercise-reps').value = exercise.repeticiones;
            document.getElementById('routine-exercise-load').value = exercise.carga;
            document.getElementById('routine-exercise-rpe').value = exercise.rpe;
            document.getElementById('routine-exercise-rest').value = exercise.descanso;
            document.getElementById('routine-add-exercise').textContent = 'Actualizar ejercicio';
        }

        function cancelRoutineExerciseEdit() {
            routineEditingExercise = null;
            const button = document.getElementById('routine-add-exercise');
            if (button) button.textContent = 'Añadir ejercicio al día';
        }

        function removeRoutineExercise(dayNumber, exerciseIndex) {
            const day = routineDraftDays.find(item => item.numero === dayNumber);
            if (day) day.ejercicios.splice(exerciseIndex, 1);
            renderRoutineDraft();
        }

        function editarRutina(id) {
            if (activeUser.role === 'Cliente') return;
            const routine = baseRutinas.find(item => item.id === id);
            if (!routine) return;
            routineEditingId = id;
            routineDraftDays = JSON.parse(JSON.stringify(routine.dias || []));
            openModal('rutina-modal');
            document.getElementById('modal-rutina-titulo').textContent = 'Editar rutina';
            document.getElementById('modal-rutina-submit').textContent = 'Guardar cambios';
            document.getElementById('modal-rutina-cliente').value = String(baseClientes.find(client => client.nombre === routine.cliente)?.id || '');
            document.getElementById('modal-rutina-objetivo').value = routine.objetivo;
            document.getElementById('modal-rutina-trainer').value = routine.entrenador;
            document.getElementById('modal-rutina-duracion').value = routine.duracion;
            document.getElementById('routine-days-per-week').value = String(routine.diasSemana || routineDraftDays.length || 1);
            configureRoutineDays();
        }

        function eliminarRutina(id) {
            if (activeUser.role === 'Cliente') return;
            if (!confirm('¿Quieres eliminar esta rutina?')) return;
            baseRutinas = baseRutinas.filter(item => item.id !== id);
            saveData('powergym-rutinas', baseRutinas);
            renderRutinasTable();
            triggerNotification('Rutina eliminada.', 'success');
        }

        function registrarRutina(event) {
            event.preventDefault();
            if (activeUser.role === 'Cliente') return;
            const cliId = parseInt(document.getElementById('modal-rutina-cliente').value);
            const obj = document.getElementById('modal-rutina-objetivo').value.trim();
            const trn = document.getElementById('modal-rutina-trainer').value;
            const dur = document.getElementById('modal-rutina-duracion').value.trim();
            const days = JSON.parse(JSON.stringify(routineDraftDays));
            const exerciseCount = days.reduce((total, day) => total + day.ejercicios.length, 0);
            if (!exerciseCount) {
                triggerNotification('Añade al menos un ejercicio antes de confirmar la rutina.', 'error');
                return;
            }

            const c = baseClientes.find(cli => cli.id === cliId);
            if(c) {
                const routine = {
                    id: routineEditingId || Date.now(),
                    cliente: c.nombre,
                    objetivo: obj,
                    entrenador: trn,
                    duracion: dur,
                    diasSemana: days.length,
                    dias: days,
                    estado: 'Vigente'
                };
                if (routineEditingId) {
                    baseRutinas = baseRutinas.map(item => item.id === routineEditingId ? routine : item);
                } else {
                    baseRutinas.unshift(routine);
                }
                saveData('powergym-rutinas', baseRutinas);
                renderRutinasTable();
                closeModal('rutina-modal');
                triggerNotification(`Rutina guardada para ${c.nombre}.`, 'success');
                event.target.reset();
                routineEditingId = null;
                routineDraftDays = [];
                document.getElementById('modal-rutina-titulo').textContent = 'Planificar rutina';
                document.getElementById('modal-rutina-submit').textContent = 'Confirmar rutina';
            }
        }

        function renderClientPlans() {
            const client = baseClientes.find(item => item.id === activeUser.clientId);
            const workoutContainer = document.getElementById('client-workout-plan');
            const foodContainer = document.getElementById('client-food-plan');
            if (!client || !workoutContainer || !foodContainer) return;
            document.getElementById('client-plan-subtitle').textContent = `Planes asignados a ${client.nombre}. Consulta aquí las últimas indicaciones de tu entrenador.`;

            const routines = baseRutinas.filter(routine => routine.cliente === client.nombre);
            workoutContainer.innerHTML = routines.length ? routines.map(routine => `<div class="space-y-3"><div><h5 class="font-bold text-pgBlue-dark">${escapeHTML(routine.objetivo)}</h5><p class="text-xs text-gray-500">${escapeHTML(routine.duracion)} · ${routine.diasSemana} días por semana · Entrenador: ${escapeHTML(routine.entrenador)}</p></div><div class="grid lg:grid-cols-2 gap-3">${routine.dias.map(day => `<article class="rounded-xl border border-gray-100 bg-gray-50 p-4"><h6 class="font-bold text-pgBlue-dark">Día ${day.numero} · ${escapeHTML(day.enfoque)}</h6><div class="mt-3 space-y-2">${day.ejercicios.length ? day.ejercicios.map(exercise => `<div class="rounded-lg bg-white p-3"><strong class="text-sm text-gray-800">${escapeHTML(exercise.nombre)}</strong><p class="mt-1 text-xs text-gray-500">${exercise.series} series · ${escapeHTML(exercise.repeticiones)} repeticiones · ${exercise.carga} kg · RPE ${exercise.rpe} · descanso ${exercise.descanso} s</p></div>`).join('') : '<p class="text-sm text-gray-400">Sin ejercicios asignados.</p>'}</div></article>`).join('')}</div></div>`).join('') : '<p class="text-sm text-gray-500">Aún no tienes una rutina asignada. Consulta con tu entrenador.</p>';

            const foods = nutritionPlans.filter(plan => plan.cliente === client.nombre);
            foodContainer.innerHTML = nutritionDays.map(day => {
                const meals = groupNutritionMeals(foods.filter(plan => (plan.dia || 'Lunes') === day));
                const mealContent = meals.length ? meals.map(renderClientMealCard).join('') : '<p class="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">Sin alimentos asignados para este día.</p>';
                return `<section class="rounded-xl border border-gray-100 bg-white p-4"><h5 class="mb-3 font-extrabold text-pgBlue-dark">${day}</h5><div class="grid md:grid-cols-2 gap-3">${mealContent}</div></section>`;
            }).join('');
        }

        const nutritionDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

        function nutritionDaysInOrder(records) {
            return nutritionDays;
        }

        function getNutritionMealId(record) {
            return String(record.mealId || `legacy-${record.id}`);
        }

        function groupNutritionMeals(records) {
            const groups = new Map();
            records.forEach(record => {
                const key = getNutritionMealId(record);
                if (!groups.has(key)) groups.set(key, []);
                groups.get(key).push(record);
            });
            const mealOrder = ['Desayuno', 'Media mañana', 'Almuerzo', 'Media tarde', 'Cena'];
            return [...groups.values()].sort((first, second) => mealOrder.indexOf(first[0].comida) - mealOrder.indexOf(second[0].comida));
        }

        function getMealMacros(records) {
            return records.reduce((total, record) => {
                const macros = getFoodMacros(record.alimento, record.gramos);
                total.carbs += macros.carbs;
                total.protein += macros.protein;
                total.fat += macros.fat;
                return total;
            }, { carbs: 0, protein: 0, fat: 0 });
        }

        function renderClientMealCard(records) {
            const meal = records[0];
            const totals = getMealMacros(records);
            return `<article class="rounded-xl bg-gray-50 p-4"><h6 class="font-bold text-pgBlue-dark">${escapeHTML(meal.comida)} · ${escapeHTML(meal.objetivo)}</h6><div class="mt-2 space-y-1">${records.map(record => `<p class="text-sm text-gray-700">${escapeHTML(foodCatalog[record.alimento]?.name || record.alimento)} · ${record.gramos} g</p>`).join('')}</div><p class="mt-2 text-xs text-gray-500">Totales: carbohidratos ${totals.carbs.toFixed(1)} g · proteínas ${totals.protein.toFixed(1)} g · grasas ${totals.fat.toFixed(1)} g</p></article>`;
        }

        function getFoodMacros(foodKey, grams) {
            const food = foodCatalog[foodKey];
            const factor = Number(grams || 0) / 100;
            return {
                carbs: food.carbs * factor,
                protein: food.protein * factor,
                fat: food.fat * factor
            };
        }

        function updateMacroPreview() {
            const foodKey = document.getElementById('nutrition-food').value;
            const macros = getFoodMacros(foodKey, document.getElementById('nutrition-grams').value);
            document.getElementById('macro-carbs').textContent = `${macros.carbs.toFixed(1)} g`;
            document.getElementById('macro-protein').textContent = `${macros.protein.toFixed(1)} g`;
            document.getElementById('macro-fat').textContent = `${macros.fat.toFixed(1)} g`;
        }

        function populateFoodOptions() {
            const category = document.getElementById('nutrition-category').value;
            const keys = nutritionFoodGroups[category] || [];
            document.getElementById('nutrition-food').innerHTML = keys.map(key => `<option value="${key}">${escapeHTML(foodCatalog[key].name)}</option>`).join('');
            updateMacroPreview();
        }

        function renderNutritionDraft() {
            const container = document.getElementById('nutrition-meal-draft');
            const totals = getMealMacros(nutritionDraftFoods);
            document.getElementById('meal-total-carbs').textContent = `${totals.carbs.toFixed(1)} g`;
            document.getElementById('meal-total-protein').textContent = `${totals.protein.toFixed(1)} g`;
            document.getElementById('meal-total-fat').textContent = `${totals.fat.toFixed(1)} g`;
            container.innerHTML = nutritionDraftFoods.length ? nutritionDraftFoods.map((item, index) => {
                const macros = getFoodMacros(item.alimento, item.gramos);
                return `<div class="flex flex-col gap-2 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:justify-between"><div><strong class="text-sm text-gray-800">${escapeHTML(foodCatalog[item.alimento].name)}</strong><p class="text-xs text-gray-500">${escapeHTML(item.grupo)} · ${item.gramos} g · C ${macros.carbs.toFixed(1)} g · P ${macros.protein.toFixed(1)} g · G ${macros.fat.toFixed(1)} g</p></div><div class="flex gap-3"><button type="button" onclick="editNutritionDraftFood(${index})" class="text-xs font-bold text-pgBlue">Editar</button><button type="button" onclick="removeNutritionDraftFood(${index})" class="text-xs font-bold text-red-600">Quitar</button></div></div>`;
            }).join('') : '<p class="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">Selecciona y añade los alimentos que componen esta comida.</p>';
        }

        function addFoodToMealDraft() {
            const item = {
                grupo: document.getElementById('nutrition-category').value,
                alimento: document.getElementById('nutrition-food').value,
                gramos: Number(document.getElementById('nutrition-grams').value)
            };
            if (!item.alimento || item.gramos < 1) return;
            if (nutritionDraftEditingIndex === null) nutritionDraftFoods.push(item);
            else nutritionDraftFoods[nutritionDraftEditingIndex] = item;
            nutritionDraftEditingIndex = null;
            renderNutritionDraft();
        }

        function editNutritionDraftFood(index) {
            const item = nutritionDraftFoods[index];
            if (!item) return;
            nutritionDraftEditingIndex = index;
            document.getElementById('nutrition-category').value = item.grupo;
            populateFoodOptions();
            document.getElementById('nutrition-food').value = item.alimento;
            document.getElementById('nutrition-grams').value = item.gramos;
            updateMacroPreview();
        }

        function removeNutritionDraftFood(index) {
            nutritionDraftFoods.splice(index, 1);
            if (nutritionDraftEditingIndex === index) nutritionDraftEditingIndex = null;
            renderNutritionDraft();
        }

        function renderNutritionPlans() {
            const container = document.getElementById('nutrition-plans');
            if (!container) return;
            const clientSelect = document.getElementById('nutrition-profile-client');
            const selectedClientId = Number(clientSelect.value) || baseClientes[0]?.id;
            if (!clientSelect.options.length) {
                clientSelect.innerHTML = baseClientes.map(client => `<option value="${client.id}">${escapeHTML(client.nombre)}</option>`).join('');
            }
            if (selectedClientId) clientSelect.value = String(selectedClientId);
            const client = baseClientes.find(item => item.id === Number(clientSelect.value));
            if (!client) return;
            const selectedGoal = document.getElementById('nutrition-profile-goal').value;
            document.getElementById('nutrition-profile-heading').textContent = `Semana de alimentación · ${client.nombre}`;
            const profileRecords = nutritionPlans.filter(plan => plan.cliente === client.nombre
                && (selectedGoal === 'Todos' || plan.objetivo === selectedGoal));
            container.innerHTML = nutritionDays.map(day => {
                const meals = groupNutritionMeals(profileRecords.filter(plan => (plan.dia || 'Lunes') === day));
                const mealContent = meals.length ? meals.map(meal => renderNutritionMealCard(meal, true)).join('') : '<p class="rounded-lg bg-white p-4 text-sm text-gray-500">Este día aún no tiene comidas planificadas.</p>';
                return `<section class="rounded-xl border border-gray-100 bg-white p-4"><div class="mb-3 flex flex-wrap items-center justify-between gap-3"><div><h5 class="font-extrabold text-pgBlue-dark">${day}</h5><p class="text-xs text-gray-500">${meals.length} comidas asignadas</p></div><button type="button" onclick="openNutritionModalForClient(${client.id}, '${selectedGoal === 'Todos' ? '' : selectedGoal}', '${day}')" class="rounded-lg border border-pgBlue/20 px-3 py-2 text-xs font-bold text-pgBlue hover:bg-pgBlue/5">Agregar comida a ${day}</button></div><div class="space-y-3">${mealContent}</div></section>`;
            }).join('');
        }

        function openNutritionModalForClient(clientId = null, goal = null, day = null) {
            openNutritionModal();
            const selectedClient = clientId || Number(document.getElementById('nutrition-profile-client').value);
            if (selectedClient) document.getElementById('nutrition-client').value = String(selectedClient);
            if (goal) document.getElementById('nutrition-goal').value = goal;
            if (day) document.getElementById('nutrition-day').value = day;
        }

        function renderNutritionMealCard(records, allowEdits) {
            const meal = records[0];
            const totals = getMealMacros(records);
            const groupId = getNutritionMealId(meal);
            const actions = allowEdits ? `<div class="flex gap-3"><button onclick="editNutritionPlan('${groupId}')" class="text-xs font-bold text-pgBlue">Editar comida</button><button onclick="deleteNutritionPlan('${groupId}')" class="text-xs font-bold text-red-600">Eliminar comida</button></div>` : '';
            return `<details class="rounded-xl border border-gray-100 bg-white" open><summary class="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-bold text-pgBlue-dark"><span>${escapeHTML(meal.comida)} <span class="text-xs font-medium text-gray-400">${records.length} alimentos</span></span>${actions}</summary><div class="space-y-2 border-t border-gray-100 px-4 py-3">${records.map(record => {
                const macros = getFoodMacros(record.alimento, record.gramos);
                return `<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"><span class="text-sm text-gray-700">${escapeHTML(foodCatalog[record.alimento]?.name || record.alimento)} · ${record.gramos} g</span><span class="text-xs text-gray-500">C ${macros.carbs.toFixed(1)} g · P ${macros.protein.toFixed(1)} g · G ${macros.fat.toFixed(1)} g</span></div>`;
            }).join('')}<p class="border-t border-gray-100 pt-2 text-xs font-bold text-pgBlue-dark">Total comida: C ${totals.carbs.toFixed(1)} g · P ${totals.protein.toFixed(1)} g · G ${totals.fat.toFixed(1)} g</p></div></details>`;
        }

        function prepareNutritionForm() {
            document.getElementById('nutrition-client').innerHTML = baseClientes.map(client => `<option value="${client.id}">${escapeHTML(client.nombre)}</option>`).join('');
            populateFoodOptions();
        }

        function openNutritionModal(id = null) {
            if (activeUser.role === 'Cliente') return;
            prepareNutritionForm();
            document.getElementById('nutrition-form').reset();
            populateFoodOptions();
            nutritionDraftFoods = [];
            nutritionDraftEditingIndex = null;
            nutritionEditingId = id;
            if (id !== null) {
                const records = nutritionPlans.filter(item => getNutritionMealId(item) === String(id));
                if (!records.length) return;
                const plan = records[0];
                document.getElementById('nutrition-modal-title').textContent = 'Editar comida';
                document.getElementById('nutrition-submit').textContent = 'Guardar comida';
                document.getElementById('nutrition-client').value = String(baseClientes.find(client => client.nombre === plan.cliente)?.id || '');
                document.getElementById('nutrition-goal').value = plan.objetivo;
                document.getElementById('nutrition-meal').value = plan.comida;
                document.getElementById('nutrition-day').value = plan.dia || 'Lunes';
                nutritionDraftFoods = records.map(record => ({
                    alimento: record.alimento,
                    gramos: Number(record.gramos),
                    grupo: record.grupo || Object.entries(nutritionFoodGroups).find(([, foods]) => foods.includes(record.alimento))?.[0] || 'Carbohidratos'
                }));
                const firstItem = nutritionDraftFoods[0];
                document.getElementById('nutrition-category').value = firstItem.grupo;
                populateFoodOptions();
                document.getElementById('nutrition-food').value = firstItem.alimento;
                document.getElementById('nutrition-grams').value = firstItem.gramos;
            } else {
                document.getElementById('nutrition-modal-title').textContent = 'Planificar comida';
                document.getElementById('nutrition-submit').textContent = 'Confirmar comida';
            }
            updateMacroPreview();
            renderNutritionDraft();
            document.getElementById('nutrition-modal').classList.remove('hidden');
        }

        function saveNutritionPlan(event) {
            event.preventDefault();
            if (activeUser.role === 'Cliente') return;
            if (!nutritionDraftFoods.length) {
                triggerNotification('Añade al menos un alimento antes de confirmar la comida.', 'error');
                return;
            }
            const clientId = Number(document.getElementById('nutrition-client').value);
            const client = baseClientes.find(item => item.id === clientId);
            if (!client) return;
            const matchingSlot = nutritionPlans.find(item => item.cliente === client.nombre
                && item.objetivo === document.getElementById('nutrition-goal').value
                && item.dia === document.getElementById('nutrition-day').value
                && item.comida === document.getElementById('nutrition-meal').value);
            const mealId = nutritionEditingId || matchingSlot?.mealId || `meal-${Date.now()}`;
            const existingSlotFoods = matchingSlot && !nutritionEditingId
                ? nutritionPlans.filter(item => getNutritionMealId(item) === String(mealId)).map(item => ({
                    alimento: item.alimento,
                    gramos: Number(item.gramos),
                    grupo: item.grupo || Object.entries(nutritionFoodGroups).find(([, foods]) => foods.includes(item.alimento))?.[0] || 'Carbohidratos'
                }))
                : [];
            const foodsToSave = [...existingSlotFoods, ...nutritionDraftFoods];
            const mealRecords = foodsToSave.map((food, index) => ({
                id: Date.now() + index,
                mealId,
                cliente: client.nombre,
                objetivo: document.getElementById('nutrition-goal').value,
                dia: document.getElementById('nutrition-day').value,
                comida: document.getElementById('nutrition-meal').value,
                alimento: food.alimento,
                gramos: Number(food.gramos),
                grupo: food.grupo
            }));
            nutritionPlans = [...mealRecords, ...nutritionPlans.filter(item => getNutritionMealId(item) !== String(mealId))];
            saveData('powergym-nutricion', nutritionPlans);
            renderNutritionPlans();
            closeModal('nutrition-modal');
            triggerNotification(`Comida guardada para ${client.nombre}.`, 'success');
        }

        function editNutritionPlan(mealId) {
            if (activeUser.role === 'Cliente') return;
            openNutritionModal(mealId);
        }

        function deleteNutritionPlan(mealId) {
            if (activeUser.role === 'Cliente') return;
            if (!confirm('¿Quieres eliminar esta comida completa del plan?')) return;
            nutritionPlans = nutritionPlans.filter(item => getNutritionMealId(item) !== String(mealId));
            saveData('powergym-nutricion', nutritionPlans);
            renderNutritionPlans();
            triggerNotification('Comida eliminada del plan.', 'success');
        }

        function openTrackingModal(id = null) {
            if (activeUser.role === 'Cliente') return;
            document.getElementById('tracking-client').innerHTML = baseClientes.map(client => `<option value="${client.id}">${escapeHTML(client.nombre)}</option>`).join('');
            document.getElementById('tracking-form').reset();
            trackingEditingId = id;
            document.getElementById('tracking-date').value = new Date().toISOString().slice(0, 10);
            if (id !== null) {
                const record = progressRecords.find(item => item.id === id);
                if (!record) return;
                document.getElementById('tracking-modal-title').textContent = 'Editar seguimiento';
                document.getElementById('tracking-submit').textContent = 'Guardar cambios';
                document.getElementById('tracking-client').value = String(baseClientes.find(client => client.nombre === record.cliente)?.id || '');
                document.getElementById('tracking-date').value = record.fecha;
                document.getElementById('tracking-weight').value = record.peso;
                document.getElementById('tracking-waist').value = record.cintura ?? '';
                document.getElementById('tracking-fat').value = record.grasa ?? '';
            } else {
                document.getElementById('tracking-modal-title').textContent = 'Registrar seguimiento';
                document.getElementById('tracking-submit').textContent = 'Guardar seguimiento';
            }
            document.getElementById('tracking-modal').classList.remove('hidden');
        }

        function saveTrackingRecord(event) {
            event.preventDefault();
            if (activeUser.role === 'Cliente') return;
            const client = baseClientes.find(item => item.id === Number(document.getElementById('tracking-client').value));
            if (!client) return;
            const record = {
                id: trackingEditingId || Date.now(),
                cliente: client.nombre,
                fecha: document.getElementById('tracking-date').value,
                peso: Number(document.getElementById('tracking-weight').value),
                cintura: Number(document.getElementById('tracking-waist').value) || null,
                grasa: Number(document.getElementById('tracking-fat').value) || null
            };
            progressRecords = trackingEditingId ? progressRecords.map(item => item.id === trackingEditingId ? record : item) : [record, ...progressRecords];
            saveData('powergym-seguimiento', progressRecords);
            renderTrackingTable();
            closeModal('tracking-modal');
            triggerNotification('Seguimiento guardado.', 'success');
        }

        function renderTrackingTable() {
            const tbody = document.getElementById('tracking-table-body');
            if (!tbody) return;
            tbody.innerHTML = progressRecords.map(record => `<tr><td class="px-5 py-4">${escapeHTML(record.fecha)}</td><td class="px-5 py-4 font-semibold text-pgBlue-dark">${escapeHTML(record.cliente)}</td><td class="px-5 py-4">${record.peso} kg</td><td class="px-5 py-4">${record.cintura ? `${record.cintura} cm` : '—'}</td><td class="px-5 py-4">${record.grasa ? `${record.grasa}%` : '—'}</td><td class="px-5 py-4 text-right whitespace-nowrap space-x-2"><button onclick="openTrackingModal(${record.id})" class="font-bold text-pgBlue">Editar</button><button onclick="deleteTrackingRecord(${record.id})" class="font-bold text-red-600">Eliminar</button></td></tr>`).join('') || '<tr><td colspan="6" class="px-5 py-6 text-gray-400">Todavía no hay mediciones registradas.</td></tr>';
        }

        function deleteTrackingRecord(id) {
            if (activeUser.role === 'Cliente') return;
            if (!confirm('¿Quieres eliminar este registro de seguimiento?')) return;
            progressRecords = progressRecords.filter(item => item.id !== id);
            saveData('powergym-seguimiento', progressRecords);
            renderTrackingTable();
            triggerNotification('Registro eliminado.', 'success');
        }

        function openModal(id) {
            if (activeUser.role === 'Cliente' && ['rutina-modal', 'nutrition-modal', 'tracking-modal', 'cliente-modal', 'membresia-modal', 'pago-modal'].includes(id)) return;
            document.getElementById(id).classList.remove('hidden');
            
            if(id === 'membresia-modal') {
                const select = document.getElementById('modal-membresia-cliente');
                select.innerHTML = baseClientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
            } else if(id === 'pago-modal') {
                const select = document.getElementById('modal-pago-cliente');
                select.innerHTML = baseClientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
            } else if(id === 'rutina-modal') {
                const select = document.getElementById('modal-rutina-cliente');
                select.innerHTML = baseClientes.map(c => `<option value="${c.id}">${c.nombre}</option>`).join('');
                populateRoutineCategories();
                if (!routineEditingId) {
                    document.getElementById('rutina-form').reset();
                    routineDraftDays = [];
                    document.getElementById('modal-rutina-titulo').textContent = 'Planificar rutina';
                    document.getElementById('modal-rutina-submit').textContent = 'Confirmar rutina';
                    configureRoutineDays();
                }
            }
        }

        function closeModal(id) {
            document.getElementById(id).classList.add('hidden');
            if (id === 'rutina-modal') {
                routineEditingId = null;
                routineDraftDays = [];
                routineEditingExercise = null;
                document.getElementById('modal-rutina-titulo').textContent = 'Planificar rutina';
                document.getElementById('modal-rutina-submit').textContent = 'Confirmar rutina';
            }
            if (id === 'nutrition-modal') {
                nutritionEditingId = null;
                nutritionDraftFoods = [];
                nutritionDraftEditingIndex = null;
            }
            if (id === 'tracking-modal') trackingEditingId = null;
        }

        function actualizarNombreZip() {
            const nombre = document.getElementById('sena-input-nombre').value.trim() || "Nombre";
            const apellido = document.getElementById('sena-input-apellido').value.trim() || "Apellido";
            
            const cleanNombre = nombre.replace(/\s+/g, '_');
            const cleanApellido = apellido.replace(/\s+/g, '_');

            document.getElementById('sena-zip-display').textContent = `GA5-220501095-AA1-EV03_${cleanNombre}_${cleanApellido}.zip`;
        }

        function copiarNombreZip() {
            const textToCopy = document.getElementById('sena-zip-display').textContent;
            
            const tempInput = document.createElement('input');
            tempInput.value = textToCopy;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

            triggerNotification("¡Nombre de archivo copiado al portapapeles!", "success");
        }

        function copiarDocumentacion() {
            const textToCopy = document.getElementById('sena-doc-text').value;
            
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = textToCopy;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand('copy');
            document.body.removeChild(tempTextArea);

            triggerNotification("¡Documentación de la maqueta copiada!", "success");
        }

        function triggerNotification(message, type = 'success') {
            const container = document.getElementById('toast-container');
            const toast = document.createElement('div');
            toast.className = 'flex items-center gap-3 p-4 rounded-xl border shadow-lg transition duration-300 transform translate-y-2 opacity-0 pointer-events-auto bg-white';
            
            let icon = '<i class="fa-solid fa-circle-check text-green-500"></i>';
            let border = 'border-green-100';
            
            if (type === 'error') {
                icon = '<i class="fa-solid fa-triangle-exclamation text-red-500"></i>';
                border = 'border-red-100';
            } else if (type === 'info') {
                icon = '<i class="fa-solid fa-circle-info text-pgBlue"></i>';
                border = 'border-pgBlue-light/20';
            }

            toast.className += ` ${border}`;
            toast.innerHTML = `
                <div class="text-base">${icon}</div>
                <p class="text-xs font-semibold text-gray-700 leading-tight">${message}</p>
            `;

            container.appendChild(toast);

            setTimeout(() => {
                toast.classList.remove('translate-y-2', 'opacity-0');
            }, 10);

            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-1');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 4000);
        }

        function toggleMobileSidebar() {
            const aside = document.querySelector('aside');
            aside.classList.toggle('hidden');
        }

        function actualizarKPIs() {
            document.getElementById('kpi-total-clientes').textContent = baseClientes.length;
            document.getElementById('kpi-activas').textContent = baseClientes.filter(c => c.estado === 'Activo').length;
            
            const aprobados = basePagos.filter(p => p.estado === 'Aprobado');
            const total = aprobados.reduce((acc, curr) => acc + curr.valor, 0);
            document.getElementById('kpi-total-ingresos').textContent = `$${(total + 18500000).toLocaleString()}`;
        }

        function initCharts() {
            const ctxBarras = document.getElementById('chart-barras-ingresos').getContext('2d');
            const ctxPie = document.getElementById('chart-pie-membresias').getContext('2d');

            if(myBarChart) myBarChart.destroy();
            if(myPieChart) myPieChart.destroy();

            myBarChart = new Chart(ctxBarras, {
                type: 'bar',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'],
                    datasets: [{
                        label: 'Ingresos Mensuales ($ COP)',
                        data: [12000000, 14200000, 15800000, 16100000, 17500000, 18500000, 19360000],
                        backgroundColor: '#0B3D91',
                        borderRadius: 8,
                        hoverBackgroundColor: '#FF6B00'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            grid: { color: '#f3f4f6' },
                            ticks: { font: { family: 'Poppins', size: 10 } }
                        },
                        x: {
                            grid: { display: false },
                            ticks: { font: { family: 'Poppins', size: 10 } }
                        }
                    }
                }
            });

            const basico = baseClientes.filter(c => c.plan === 'Básico').length;
            const premium = baseClientes.filter(c => c.plan === 'Premium').length;
            const elite = baseClientes.filter(c => c.plan === 'Elite').length;

            myPieChart = new Chart(ctxPie, {
                type: 'doughnut',
                data: {
                    labels: ['Básico', 'Premium', 'Elite'],
                    datasets: [{
                        data: [basico, premium, elite],
                        backgroundColor: ['#9ca3af', '#0B3D91', '#FF6B00'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { family: 'Poppins', size: 10 },
                                usePointStyle: true
                            }
                        }
                    }
                }
            });
        }

        window.onload = function() {
            switchView('landing');
            const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            const hoy = new Date();
            document.getElementById('admin-current-date').textContent = hoy.toLocaleDateString('es-ES', opciones);
        }
