<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
    import Icon from '@iconify/svelte';
    import { page } from "$app/stores";

    const networks: {color: string, icon: string, link: string}[] = [
        {color: '#2ca5e0', icon: 'ic:baseline-telegram', link: 'https://t.me/chocopoly'},
        {color: '#ff0202', icon: 'mdi:instagram', link: 'https://www.instagram.com/chocopoly_epfl'},
    ]
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Chocopoly</title>
	<meta name="title" content="Chocopoly" />
	<meta name="description" content={`L'association Chocopoly`} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="Chocopoly" />
	<meta property="og:description" content={`L'association Chocopoly`} />
</svelte:head>

<div class="hidden">
    <div class="bg-[#2ca5e0]"></div>
    <div class="bg-[#ff0202]"></div>
    <!-- Generate before compile the colors for tailwindcss -->
</div>

<div id="start" class="bg-accent md:h-[30rem] flex md:px-40 lg:px-72 justify-between justify-items-center items-center flex-col md:flex-row">
    <div class="w-full md:w-1/2 px-10">
        <p class="my-8 text-primary-foreground min-w-52 text-2xl">Chocopoly est une association qui organise des événements autour du chocolat chaud à l’EPFL.</p>
        <div class="flex items-center h-20 justify-center my-2">
            {#each networks as network}
                <a href={network.link} class="z-10 rounded-full bg-[{network.color}] w-20 h-20 min-w-12 mx-4 hover:border hover:border-white duration-100 hover:w-[70px] hover:h-[70px] flex items-center justify-center">
                    <Icon icon={network.icon} color="white" style="font-size: 50px;"/>
                </a>
            {/each}
        </div>
    </div>
    <div class="w-2/3 md:w-1/2 flex z-1 h-full px-10">
        <img src="./logo_rond.png" alt="Logo rond JDR-Poly" class="object-contain mx-auto">
    </div>
    
    
</div>
<div id="transition" class="h-[15vh] md:h-[40vh] overflow-hiddesn">
    <img src="./layered-waves.svg" alt="layered wave" class="w-lvw">
</div>
<div id="main-text" class="mx-auto w-3/4 md:w-2/5 text-center text-gray-800">
    <h6 class="uppercase text-xl my-1">Le chocolat chaud pour réchauffer les coeurs.</h6>
    <h4 class="uppercase text-3xl font-bold tracking-wide my-1">Chocopoly</h4>
    <img src="./chocolate.svg" alt="chocolat bar" class="h-12 w-12 object-contain mx-auto my-1">
    <p class="text-xl text-gray-500 leading-6 my-3 lg:text-center text-justify">
        Salut à toi, ami·e du chocolat ! Envie de te réchauffer le cœur après une série d'analyse difficile ? De passer un bon moment avec d’autres amoureux du cacao ? De découvrir de nouvelles recettes incroyables pour te régaler ?
        <br/>
        Alors ne réfléchis plus, Chocopoly est faite pour toi ! Chocopoly est l’association spécialisée dans le chocolat chaud à l'EPFL. Nous organisons régulièrement des événements en partenariat avec d’autres associations et parfois des réunions entre membres pour discuter autour d’une tasse.
        <br/>
        Contacte-nous sur Insta ou Telegram pour nous nous rejoindre !
    </p>
    <a href="mailto:contact@chocopoly.ch">
        <Button class="text-xl p-8 mx-auto">Proposer un partenariat : contact@chocopoly.ch</Button>
    </a>
</div>
<div class="h-fit min-h-96 flex lg:px-4 justify-between justify-items-center items-center flex-col lg:flex-row mt-8 py-2 bg-gray-100 relative">
    <div class="w-full lg:w-1/2 mx-auto lg:px-10 flex flex-col lg:flex-row-reverse h-full">
        <img src="committee/chocomite1.png" alt="Comité chocopoly 1" class="w-[250px] h-[250px] lg:mx-2 my-2">
        <img src="committee/chocomite2.png" alt="Comité chocopoly 2" class="w-[250px] h-[250px] lg:mx-2 my-2">
        <img src="committee/chocomite3.png" alt="Comité chocopoly 3" class="w-[250px] h-[250px] lg:mx-2 my-2">
    </div>
    <div class="w-full lg:w-1/2 px-10 py-4">
        <h4 class="text-3xl tracking-wide text-black">L'équipe</h4>
        <p class="py-2 text-gray-500 text-sm">Notre équipe de cuistos répond toujours présente pour réchauffer les cœurs des étudiant·es de l'EPFL et organiser des événements chaleureux et conviviaux !</p>
        <p class="text-gray-500 text-sm">Du chocolat traditionnel Rita avec sa dose de chantilly et son chocolat intense, à notre chocolat originel et son délicieux lait végétal, Chocopoly propose plusieurs recettes et vous fait découvrir différentes conceptions du chocolat chaud !</p>
    </div>
</div>
<div class="h-fit md:px-20">
    <div class="flex flex-col md:grid grid-flow-dense gap-2 grid-cols-2 grid-rows-2 h-[800px] p-10">
        <img src="main/gallery2.jpg" class="col-span-1 w-full h-full object-cover row-span-2" alt="hot chocolat">
        <img src="main/gallery1.jpg" class="col-span-1 w-full h-full object-cover" alt="hot chocolat">
        <img src="main/gallery3.jpg" class="col-span-1 w-full h-full object-cover" alt="hot chocolat">
    </div>
</div>
<div class="bg-gray-100 mx-auto text-center text-gray-800 py-4">
    <h6 class="uppercase text-sm my-1">Nous sommes sur les réseaux</h6>
    <h4 class="uppercase text-2xl font-bold tracking-wide my-1">Rejoins nous !</h4>
    <div class="flex items-center h-20 justify-center my-2">
        {#each networks as network}
            <a href={network.link} class="rounded-full bg-[{network.color}] w-12 h-12 mx-4 hover:border hover:border-white duration-100 hover:w-[50px] hover:h-[50px] flex items-center justify-center">
                <Icon icon={network.icon} color="white" style="font-size: 30px"/>
            </a>
        {/each}
    </div>
</div>
<div class="my-2 w-full">
    <div class="mx-auto w-fit">
        <a href="reglement_interne_chocopoly_29_novembre_2024.pdf" target="_blank">
            <Button class="mx-auto">Statuts au 29 novembre 2024</Button>
        </a>
    </div>
</div>
<div class="bg-gray-100 text-gray-500 text-center py-2 text-sm">
    <p>© Copyright – Chocopoly 2025</p>
</div>