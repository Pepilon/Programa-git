let baseClientes = [
            { id: 1, nombre: "Milena Patricia Gómez", documento: "105678942", correo: "milena@example.com", telefono: "+57 321 4567", plan: "Premium", estado: "Activo", fechaInicio: "2026-06-01", fechaVence: "2026-07-01" },
            { id: 2, nombre: "Carlos Alberto Varela", documento: "80456123", correo: "carlos@example.com", telefono: "+57 301 9876", plan: "Elite", estado: "Activo", fechaInicio: "2026-05-15", fechaVence: "2026-08-15" },
            { id: 3, nombre: "Jessica Andrea Marín", documento: "109485723", correo: "jessica@example.com", telefono: "+57 312 6543", plan: "Básico", estado: "Activo", fechaInicio: "2026-06-10", fechaVence: "2026-07-10" },
            { id: 4, nombre: "David Fernando López", documento: "79852146", correo: "david@example.com", telefono: "+57 310 1122", plan: "Premium", estado: "Activo", fechaInicio: "2026-04-01", fechaVence: "2026-10-01" },
            { id: 5, nombre: "Camila Torres Ruiz", documento: "103248562", correo: "camila@example.com", telefono: "+57 315 5566", plan: "Básico", estado: "Inactivo", fechaInicio: "2025-12-01", fechaVence: "2026-01-01" },
            { id: 6, nombre: "Juan Sebastián Restrepo", documento: "101048569", correo: "sebastian@example.com", telefono: "+57 318 9988", plan: "Elite", estado: "Activo", fechaInicio: "2026-06-12", fechaVence: "2026-07-12" }
        ];

        let basePagos = [
            { id: 1, cliente: "Milena Patricia Gómez", fecha: "2026-06-01", valor: 120000, metodo: "Tarjeta de Crédito", estado: "Aprobado" },
            { id: 2, cliente: "Carlos Alberto Varela", fecha: "2026-05-15", valor: 180000, metodo: "Transferencia Bancaria", estado: "Aprobado" },
            { id: 3, cliente: "Jessica Andrea Marín", fecha: "2026-06-10", valor: 80000, metodo: "Efectivo", estado: "Aprobado" },
            { id: 4, cliente: "David Fernando López", fecha: "2026-04-01", valor: 120000, metodo: "Tarjeta de Crédito", estado: "Aprobado" },
            { id: 5, cliente: "Camila Torres Ruiz", fecha: "2025-12-01", valor: 80000, metodo: "Efectivo", estado: "Rechazado" },
            { id: 6, cliente: "Juan Sebastián Restrepo", fecha: "2026-06-12", valor: 180000, metodo: "Transferencia Bancaria", estado: "Aprobado" }
        ];

        let baseRutinas = [
            { id: 1, cliente: "Milena Patricia Gómez", objetivo: "Tonificación Pierna & Cardio", entrenador: "Laura Restrepo", duracion: "8 Semanas", estado: "Vigente" },
            { id: 2, cliente: "Carlos Alberto Varela", objetivo: "Hipertrofia Fuerza Tren Superior", entrenador: "Carlos Mendoza", duracion: "12 Semanas", estado: "Vigente" },
            { id: 3, cliente: "Jessica Andrea Marín", objetivo: "Resistencia Cardiovascular", entrenador: "Felipe Osorio", duracion: "4 Semanas", estado: "Completado" },
            { id: 4, cliente: "David Fernando López", objetivo: "Pérdida de Peso y Core", entrenador: "Laura Restrepo", duracion: "6 Semanas", estado: "Vigente" }
        ];

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
                switchAdminPanel('dashboard');
            }
        }

        function switchAdminPanel(panelId) {
            const subPaneles = ['dashboard', 'clientes', 'membresias', 'pagos', 'rutinas', 'perfil', 'evidencia'];
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
            }

            const aside = document.querySelector('aside');
            if (window.innerWidth < 768) {
                aside.classList.add('hidden');
            }
        }

        function handleLogin(event) {
            event.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const pass = document.getElementById('login-password').value.trim();

            if (email === 'admin@powergym.com' && pass === '123456') {
                triggerNotification('¡Acceso concedido! Bienvenido a Power Gym.', 'success');
                switchView('admin');
            } else {
                triggerNotification('Credenciales inválidas de prueba. Utilice el usuario sugerido.', 'error');
            }
        }

        function handleLogout() {
            triggerNotification('Sesión finalizada correctamente.', 'info');
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

        function verCliente(id) {
            const c = baseClientes.find(cli => cli.id === id);
            if(c) {
                triggerNotification(`Información: ${c.nombre} | Doc: ${c.documento} | Plan: ${c.plan} venciendo el ${c.fechaVence}.`, 'success');
            }
        }

        function eliminarCliente(id) {
            baseClientes = baseClientes.filter(cli => cli.id !== id);
            renderClientesTable(baseClientes);
            triggerNotification('Registro del cliente eliminado.', 'info');
        }

        function filtrarClientes() {
            const query = document.getElementById('clientes-search').value.toLowerCase();
            const pFilter = document.getElementById('clientes-filter-plan').value;

            const res = baseClientes.filter(c => {
                const matchQ = c.nombre.toLowerCase().includes(query) || c.documento.includes(query);
                const matchP = pFilter === 'Todos' || c.plan === pFilter;
                return matchQ && matchP;
            });
            renderClientesTable(res);
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
                const badge = r.estado === 'Vigente' ? 'bg-pgOrange/5 text-pgOrange border-pgOrange/10' : 'bg-gray-100 text-gray-500 border-gray-200';

                tr.innerHTML = `
                    <td class="px-6 py-4 font-bold text-pgBlue-dark">${r.cliente}</td>
                    <td class="px-6 py-4 text-gray-500 font-medium">${r.objetivo}</td>
                    <td class="px-6 py-4 text-gray-400 font-medium"><i class="fa-solid fa-user-tie mr-1"></i> ${r.entrenador}</td>
                    <td class="px-6 py-4 font-mono text-gray-400">${r.duracion}</td>
                    <td class="px-6 py-4">
                        <span class="border px-2 py-0.5 rounded-lg text-[9px] font-bold ${badge}">${r.estado}</span>
                    </td>
                    <td class="px-6 py-4 text-right">
                        <button onclick="triggerNotification('Visualizando detalle completo de ejercicios...', 'success')" class="text-pgBlue hover:text-pgBlue-dark p-1 font-bold"><i class="fa-regular fa-folder-open"></i> Ver</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }

        function registrarRutina(event) {
            event.preventDefault();
            const cliId = parseInt(document.getElementById('modal-rutina-cliente').value);
            const obj = document.getElementById('modal-rutina-objetivo').value.trim();
            const trn = document.getElementById('modal-rutina-trainer').value;
            const dur = document.getElementById('modal-rutina-duracion').value.trim();

            const c = baseClientes.find(cli => cli.id === cliId);
            if(c) {
                const nuevo = {
                    id: Date.now(),
                    cliente: c.nombre,
                    objetivo: obj,
                    entrenador: trn,
                    duracion: dur,
                    estado: 'Vigente'
                };
                baseRutinas.unshift(nuevo);
                renderRutinasTable();
                closeModal('rutina-modal');
                triggerNotification(`¡Rutina de entrenamiento programada correctamente para ${c.nombre}!`, 'success');
                event.target.reset();
            }
        }

        function openModal(id) {
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
            }
        }

        function closeModal(id) {
            document.getElementById(id).classList.add('hidden');
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
