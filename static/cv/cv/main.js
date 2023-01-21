// 3D CV presentation

// 3D plane with CV as texture, possible custom vertexShader

var THREE = window.THREE;

var url = document.getElementById('sum');
url = url.value;

var camera, scene, renderer, time;

init();

function init() {
    //scene, lights, background, objects, renderer

    //Setting up scene and its properties
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xa0a0a0 );

    //lights
    const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    scene.add( directionalLight );

    //camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    camera.position.z = 2.5;

    //texture loader
    const texture = new THREE.TextureLoader().load(url);

    const material = new THREE.ShaderMaterial({
    
        uniforms: {
          time: { value: 0.0 },
          map: { value: texture }
        },
        
        wireframe: false,
          vertexShader: `
      
          uniform float time;
          varying vec2 vertexUV;
      
          void main()	{
            vertexUV = uv;
            vec4 result;

            result = vec4(position.x, position.y, 0.2*cos(position.x+time), 1.0);
      
            gl_Position = projectionMatrix
              * modelViewMatrix
              * result;
          }
          `,
          fragmentShader: `
      
          uniform sampler2D map;
          varying vec2 vertexUV;
      
          void main() {
            gl_FragColor = texture2D(map, vertexUV);
          }
          `,
        });

    //plane object for CV (material, texture, geometry)
    const geometry = new THREE.PlaneGeometry( 2, 3, 50 );
    const plane = new THREE.Mesh( geometry, material );
    scene.add( plane );


    //renderer
    renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //controls
    //const controls = new OrbitControls( camera, renderer.domElement );


    function animate() {
        //renderer, requestAnimationFrame, deltaTime,
        requestAnimationFrame( animate );
        plane.material.uniforms.time.value = plane.material.uniforms.time.value + 0.005;
        renderer.render( scene, camera );
    }

    animate();
    
}

