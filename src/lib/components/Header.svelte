<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import logo from '#lib/assets/emblem-ringonly.svg';
    
    let titleBlockHovered = $state(false);
    let rotation = $state(0);
    let speed = $state(0);

    const maxSpeed = 120;
    const idleSpeed = -2;
    const acceleration = 300;
    const deceleration = 100;

    let animationFrameId: number;
    let lastTime = 0;
    
    const loop = (time: number) => {
        if (!lastTime) lastTime = time;
        const delta = (time - lastTime) / 1000;
        lastTime = time;
        
        const targetSpeed = titleBlockHovered ? maxSpeed : idleSpeed;

        if (speed < targetSpeed) {
            speed = Math.min(targetSpeed, speed + acceleration * delta);
        } else {
            speed = Math.max(targetSpeed, speed - deceleration * delta);
        }

        rotation += speed * delta;

        rotation += speed * delta;
        animationFrameId = requestAnimationFrame(loop);
    };

    onMount(() => {
        animationFrameId = requestAnimationFrame(loop);
    });

    onDestroy(() => {
        if (typeof window !== 'undefined') {
            cancelAnimationFrame(animationFrameId);
        }
    });

</script>

<header>
    <a href="/" class="title-block"
        class:hover={titleBlockHovered}
        onmouseenter={() => titleBlockHovered = true}
        onmouseleave={() => titleBlockHovered = false}>
        <enhanced:img
            class="emblem" src={logo} alt="Logo"
            style="rotate: {rotation}deg;"
            />
        <div class="text">
            <h1>sly_fae</h1>
            <p class="p5">Greigh Liath NicDhònaidh</p>
        </div>
    </a>
</header>

<style>
    header {
        position: relative;
        display: flex;
        justify-content: center;
    }
    .title-block {
        position: relative;
        display: flex;
        flex-direction: column;
        width: max-content;
        padding: 1rem;
        align-items: center;
    }
    .emblem {
        width: 375px;
        height: auto;
        opacity: 0.8;
        transition:
            opacity 0.4s ease,
            scale 0.4s ease-in-out;
    }
    
    .text {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        text-shadow: 0 0 4px #fff;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        transform-origin: 50% 160%;
        transition: transform 0.4s ease, text-shadow 0.2s ease;
    }
    
    .title-block.hover .emblem {
        opacity: 0.4;
        scale: 0.8;
    }
    .title-block.hover .text {
        transform-origin: 50% 160%;
        text-shadow: 0 0 4px #000;
        transform: scale(1.5);
    }
    
    h1 {
        font-size: 4rem;
        font-weight: 100;
    }
    p {
        font-family: "Julius Sans One", serif;
        font-size: 0.8rem;
    }
</style>