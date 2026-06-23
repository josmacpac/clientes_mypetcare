document.addEventListener('click', function (event) {
    // 1. Verificamos si el usuario hizo clic en un botón con la clase 'btn-detalle'
    if (event.target.classList.contains('btn-detalle')) {
        
        // 2. Obtenemos el ID del producto desde el atributo data-id
        const productoId = event.target.getAttribute('data-id');

        // 3. (Simulado) Aquí harías un fetch a tu API para traer los datos reales.
        // Por ahora, simularemos que buscamos los datos:
        const datosProducto = obtenerDatosSimulados(productoId);

        // 4. Inyectamos los datos en el Modal de Detalle
        document.getElementById('modalDetalleLabel').innerText = datosProducto.nombre;
        document.querySelector('#modalDetalleArticulo small').innerText = `SKU: ${datosProducto.sku}`;
        
        // Rellenamos los inputs del modal
        document.querySelector('#modalDetalleArticulo select').value = datosProducto.categoria;
        document.querySelector('#modalDetalleArticulo input[type="number"]').value = datosProducto.precio;

        // 5. Mostramos el modal usando la API de Bootstrap
        const myModal = new bootstrap.Modal(document.getElementById('modalDetalleArticulo'));
        myModal.show();
    }
});

// Función de ejemplo para simular datos que vendrían de tu base de datos SQL
function obtenerDatosSimulados(id) {
    const productos = {
        '750123': { nombre: 'Apoquel 16mg', sku: '750123', categoria: 'Medicamentos', precio: 850 },
        '750987': { nombre: 'Nupec Adulto 2kg', sku: '750987', categoria: 'Alimentos', precio: 420 }
    };
    return productos[id];
}


// Esta función se activa cuando pican "Ajustar" dentro del Detalle
function abrirAjuste(loteId, stockActual) {
    // 1. Ponemos los datos del lote en el modal de ajuste
    document.getElementById('ajusteLoteId').value = loteId;
    document.getElementById('nuevaCantidad').value = stockActual;
    document.getElementById('infoStockActual').innerHTML = `Stock actual: <span class="fw-bold">${stockActual}</span>`;
    
    // 2. Abrimos el modal de ajuste
    const modalAjuste = new bootstrap.Modal(document.getElementById('modalAjusteInventario'));
    modalAjuste.show();
}

// Esta función se activa al dar clic en "Confirmar"
function guardarAjuste() {
    const lote = document.getElementById('ajusteLoteId').value;
    const cantidad = document.getElementById('nuevaCantidad').value;
    const motivo = document.getElementById('motivoAjuste').value;

    if(!motivo) {
        alert("Por favor selecciona un motivo");
        return;
    }

    // Aquí es donde harías el fetch a tu API para guardar en SQL
    console.log(`Guardando ajuste para lote ${lote}: Nueva cantidad ${cantidad} por ${motivo}`);

    // Cerramos el modal y mandamos un aviso de éxito
    bootstrap.Modal.getInstance(document.getElementById('modalAjusteInventario')).hide();
    alert("¡Inventario actualizado correctamente!");
}