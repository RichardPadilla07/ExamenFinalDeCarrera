// admin-productos.js
// CRUD de productos para el panel admin

const API_URL = 'http://localhost:3000/api/productos';

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  document.getElementById('form-producto').onsubmit = handleCrearProducto;
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
        <td>
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

window.editarProducto = function(id) {
  // Puedes implementar un modal o formulario de edición aquí
  alert('Funcionalidad de edición pendiente para el producto ID: ' + id);
}
