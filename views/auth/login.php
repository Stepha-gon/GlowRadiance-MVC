<h1 class="nombre-pagina">Login</h1>
<p class="descripcion-pagina">Inicia sesión con tus datos</p>

<?php
    include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/" method="POST" class="formulario">
    <div class="campo">
        <label for="email" >Email</label>
        <input type="email" id="email" placeholder="Ingresa tu email" name="email">
    </div>
    <div class="campo">
        <label for="password" >Password</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" name="password">
    </div>
    <input type="submit" value="Iniciar Sesión" class="boton">
</form>
<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes cuenta? Crear una</a>
    <a href="/olvide">¿Olvidaste tu contraseña? </a>
</div>