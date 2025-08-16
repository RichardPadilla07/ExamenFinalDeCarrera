// admin-productos.js
// CRUD de productos para el panel admin
// --- Gestión de pedidos para el panel admin ---
const API_PEDIDOS = 'http://localhost:3000/api/pedidos';

// Obtener y mostrar pedidos como tarjetas
async function obtenerPedidos() {
  try {
    const res = await fetch(API_PEDIDOS);
    const pedidos = await res.json();
    mostrarPedidos(pedidos);
  } catch (error) {
    console.error('Error al obtener pedidos:', error);
  }
}

function mostrarPedidos(pedidos) {
  const container = document.getElementById('pedidos-container');
  if (!container) return;
  container.innerHTML = '';
  pedidos.forEach(pedido => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'pedido-tarjeta';
    tarjeta.innerHTML = `
      <h3>Pedido #${pedido.codigo}</h3>
      <p><strong>Cliente:</strong> ${pedido.cliente_nombre || pedido.id_cliente}</p>
      <p><strong>Producto:</strong> ${pedido.producto_nombre || pedido.id_producto}</p>
      <p><strong>Descripción:</strong> ${pedido.descripcion}</p>
      <p><strong>Estado:</strong> <span id="estado-${pedido.id}">${pedido.estado || 'pendiente'}</span></p>
      <div class="acciones">
        <button onclick="cambiarEstadoPedido(${pedido.id}, 'aprobado')">Aceptar</button>
        <button class="rechazar" onclick="cambiarEstadoPedido(${pedido.id}, 'rechazado')">Rechazar</button>
        <button class="eliminar" onclick="eliminarPedido(${pedido.id})">Eliminar</button>
      </div>
    `;
    container.appendChild(tarjeta);
  });
}

window.cambiarEstadoPedido = async function(id, nuevoEstado) {
  try {
    const res = await fetch(`${API_PEDIDOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado })
    });
    if (res.ok) {
      document.getElementById(`estado-${id}`).textContent = nuevoEstado;
    }
  } catch (error) {
    console.error('Error al cambiar estado:', error);
  }
}

window.eliminarPedido = async function(id) {
  if (!confirm('¿Seguro que deseas eliminar este pedido?')) return;
  try {
    const res = await fetch(`${API_PEDIDOS}/${id}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      obtenerPedidos();
    }
  } catch (error) {
    console.error('Error al eliminar pedido:', error);
  }
}

// Inicializar pedidos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerPedidos);

const API_URL = 'http://localhost:3000/api/productos';

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  const formProducto = document.getElementById('form-producto');
  if (formProducto) formProducto.onsubmit = handleCrearProducto;
});

async function cargarProductos() {
  const tbody = document.getElementById('tabla-productos-body');
  tbody.innerHTML = '';
  try {
    const res = await fetch(API_URL);
    const productos = await res.json();
    productos.forEach((prod, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td>${prod.nombre}</td>
        <td>${prod.codigo}</td>
        <td>${prod.descripcion || ''}</td>
        <td>${prod.categoria || ''}</td>
        <td>${prod.precio}</td>
        <td>${prod.stock}</td>
        <td>${prod.fecha_ingreso ? prod.fecha_ingreso.substring(0,10) : ''}</td>
        <td>${prod.proveedor || ''}</td>
        <td style="display:flex;gap:8px;justify-content:center;align-items:center;">
          <button onclick="editarProducto(${prod.id})">✏️</button>
          <button onclick="eliminarProducto(${prod.id})">🗑️</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="10">Error al cargar productos</td></tr>';
  }
}

async function handleCrearProducto(e) {
  e.preventDefault();
  const form = e.target;
  const producto = {
    nombre: form.nombre.value.trim(),
    codigo: form.codigo.value.trim(),
    descripcion: form.descripcion.value.trim(),
    categoria: form.categoria.value.trim(),
    precio: parseFloat(form.precio.value),
    stock: parseInt(form.stock.value),
    fecha_ingreso: form.fecha_ingreso.value,
    proveedor: form.proveedor.value.trim()
  };
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto)
    });
    if (res.ok) {
      form.reset();
      // Mostrar la sección de lista y recargar productos
      if (window.mostrarSeccion && window.seccionListar) {
        window.mostrarSeccion(window.seccionListar);
      }
      cargarProductos();
    } else {
      const data = await res.json();
      alert(data.error || 'Error al crear producto');
    }
  } catch (err) {
    alert('Error de conexión');
  }
}

window.eliminarProducto = async function(id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (res.ok) cargarProductos();
    else alert('Error al eliminar producto');
  } catch (err) {
    alert('Error de conexión');
  }
}

window.editarProducto = async function(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) return alert('No se pudo obtener el producto');
    const prod = await res.json();
    const modal = document.getElementById('modal-editar-producto');
    const form = document.getElementById('form-editar-producto');
    form.nombre.value = prod.nombre || '';
    form.codigo.value = prod.codigo || '';
    form.descripcion.value = prod.descripcion || '';
    form.categoria.value = prod.categoria || '';
    form.precio.value = prod.precio || '';
    form.stock.value = prod.stock || '';
    form.fecha_ingreso.value = prod.fecha_ingreso ? prod.fecha_ingreso.substring(0,10) : '';
    form.proveedor.value = prod.proveedor || '';
    modal.style.display = 'flex';
    form.onsubmit = async function(e) {
      e.preventDefault();
      const datos = {
        nombre: form.nombre.value.trim(),
        codigo: form.codigo.value.trim(),
        descripcion: form.descripcion.value.trim(),
        categoria: form.categoria.value.trim(),
        precio: parseFloat(form.precio.value),
        stock: parseInt(form.stock.value),
        fecha_ingreso: form.fecha_ingreso.value,
        proveedor: form.proveedor.value.trim()
      };
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });
        if (res.ok) {
          modal.style.display = 'none';
          cargarProductos();
          alert('Producto actualizado correctamente');
        } else {
          alert('Error al actualizar producto');
        }
      } catch (err) {
        alert('Error de conexión');
      }
    };
    document.getElementById('btn-cerrar-modal-editar').onclick = () => {
      modal.style.display = 'none';
    };
  } catch (err) {
    alert('Error de conexión');
  }
}
