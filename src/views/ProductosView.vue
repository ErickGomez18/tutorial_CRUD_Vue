<template>
    <main>
        <h1>Lista de productos</h1>

        <form @submit.prevent="guardarProducto">
            <input v-model="producto.nombre" placeholder="Nombre" />
            <input v-model="producto.precio" placeholder="Precio" type="number" />
            <input v-model="producto.descripcion" placeholder="Descripción" />

            <button type="submit">
                {{ editando ? 'Actualizar' : 'Guardar' }}
            </button>
        </form>

        <ul>
            <li v-for="item in productos" :key="item.id">
                <strong>{{ item.nombre }}</strong> -
                ${{ item.precio }} -
                {{ item.descripcion }}

                <button @click="editarProducto(item)">Editar</button>
                <button @click="eliminarProducto(item.id)">Eliminar</button>
            </li>
        </ul>
    </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const productos = ref([])
const editando = ref(false)
const idEditando = ref(null)

const producto = ref({
    nombre: '',
    precio: '',
    descripcion: '',
})

const obtenerProductos = async () => {
    const respuesta = await axios.get('http://localhost:3000/productos')
    productos.value = respuesta.data
}

const guardarProducto = async () => {
    if (editando.value) {
        await axios.put(`http://localhost:3000/productos/${idEditando.value}`, producto.value)
        editando.value = false
        idEditando.value = null
    } else {
        await axios.post('http://localhost:3000/productos', producto.value)
    }

    producto.value = {
        nombre: '',
        precio: '',
        descripcion: '',
    }

    obtenerProductos()
}

const editarProducto = (item) => {
    editando.value = true
    idEditando.value = item.id

    producto.value = {
        nombre: item.nombre,
        precio: item.precio,
        descripcion: item.descripcion,
    }
}

const eliminarProducto = async (id) => {
    await axios.delete(`http://localhost:3000/productos/${id}`)
    obtenerProductos()
}

onMounted(() => {
    obtenerProductos()
})
</script>