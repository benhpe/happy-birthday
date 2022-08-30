import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  if (process.browser) {
      // helper functions
const PI2 = Math.PI * 2
const random = (min, max) => Math.random() * (max - min + 1) + min | 0
const timestamp = _ => new Date().getTime()

// container
class Birthday {
  constructor() {
    this.resize()

    // create a lovely place to store the firework
    this.fireworks = []
    this.counter = 0

  }
  
  resize() {
    this.width = canvas.width = window.innerWidth
    let center = this.width / 2 | 0
    this.spawnA = center - center / 4 | 0
    this.spawnB = center + center / 4 | 0
    
    this.height = canvas.height = window.innerHeight
    this.spawnC = this.height * .1
    this.spawnD = this.height * .5
    
  }
  
  onClick(evt) {
     let x = evt.clientX || evt.touches && evt.touches[0].pageX
     let y = evt.clientY || evt.touches && evt.touches[0].pageY
     
     let count = random(3,5)
     for(let i = 0; i < count; i++) this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        x,
        y,
        random(0, 260),
        random(30, 110)))
          
     this.counter = -1
     
  }
  
  update(delta) {
    ctx.globalCompositeOperation = 'hard-light'
    ctx.fillStyle = `rgba(20,20,20,${ 7 * delta })`
    ctx.fillRect(0, 0, this.width, this.height)

    ctx.globalCompositeOperation = 'lighter'
    for (let firework of this.fireworks) firework.update(delta)

    // if enough time passed... create new new firework
    this.counter += delta * 3 // each second
    if (this.counter >= 1) {
      this.fireworks.push(new Firework(
        random(this.spawnA, this.spawnB),
        this.height,
        random(0, this.width),
        random(this.spawnC, this.spawnD),
        random(0, 360),
        random(30, 110)))
      this.counter = 0
    }

    // remove the dead fireworks
    if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(firework => !firework.dead)

  }
}

class Firework {
  constructor(x, y, targetX, targetY, shade, offsprings) {
    this.dead = false
    this.offsprings = offsprings

    this.x = x
    this.y = y
    this.targetX = targetX
    this.targetY = targetY

    this.shade = shade
    this.history = []
  }
  update(delta) {
    if (this.dead) return

    let xDiff = this.targetX - this.x
    let yDiff = this.targetY - this.y
    if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) { // is still moving
      this.x += xDiff * 2 * delta
      this.y += yDiff * 2 * delta

      this.history.push({
        x: this.x,
        y: this.y
      })

      if (this.history.length > 20) this.history.shift()

    } else {
      if (this.offsprings && !this.madeChilds) {
        
        let babies = this.offsprings / 2
        for (let i = 0; i < babies; i++) {
          let targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0
          let targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0

          birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0))

        }

      }
      this.madeChilds = true
      this.history.shift()
    }
    
    if (this.history.length === 0) this.dead = true
    else if (this.offsprings) { 
        for (let i = 0; this.history.length > i; i++) {
          let point = this.history[i]
          ctx.beginPath()
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + i + '%)'
          ctx.arc(point.x, point.y, 1, 0, PI2, false)
          ctx.fill()
        } 
      } else {
      ctx.beginPath()
      ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)'
      ctx.arc(this.x, this.y, 1, 0, PI2, false)
      ctx.fill()
    }

  }
}

let canvas = document.getElementById('birthday')
let ctx = canvas.getContext('2d')

let then = timestamp()

let birthday = new Birthday
window.onresize = () => birthday.resize()
document.onclick = evt => birthday.onClick(evt)
document.ontouchstart = evt => birthday.onClick(evt)

  ;(function loop(){
  	requestAnimationFrame(loop)

  	let now = timestamp()
  	let delta = now - then

    then = now
    birthday.update(delta / 1000)
  	

  })()
}
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Happy Birthday App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Alles Gute René!</h1>
        <canvas id="birthday"></canvas>
        {/* <audio autoplay controls="on">
          <source src="/music/good_enough.mp3" type="audio/mp3">
        <p>Your browser does not support the audio element.</p>
        </audio> */}
        <iframe id="greek-wine-iframe" width="560" height="315" src="https://www.youtube.com/embed/QBkPARPm-Mc?start=61" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <div className="greek-wine-description">
        <img src="/images/Malagouzia_White.png"/>
        {/* <Image
      src="/Malagouzia_White.png"
      layout="fill"
      sizes="(min-width: 75em) 33vw,
              (min-width: 48em) 50vw,
              100vw"
    /> */}
          <div>
            <h2>Einer der besten griechischen Weine &quot;Malagousia Vourvoukeli 2021&quot;</h2>
            <p>Tropische Frucht, Aprikose, Pfirsich, mit frischer, nicht zu hoher Säure, wir lieben diesen rebsortentypischen, Malagousia (Malagouzia) aus Avdiros in Thrakien, einer der traditionellsten und ältesten Weinregionen im Nord-Osten Griechenlands. Zudem wieder ein besonders toller Jahrgang dieses Weines. Die Weine der Familie Vourvoukeli spiegeln die Liebe zu dieser historischen Weinregion. Die Trauben stammen aus ausgewählten Weingärten der Familie in  Αvdira. Nach einer zehnstündigen Kaltextraktion und Absetzen der Trubstoffe erfolgt die Vergärung bei 13 - 16 °C im Stahltank. Der Wein verbleibt danach für zwei Monate auf seiner Feinhefe.</p>
            <p><strong>Verkostung:</strong>blasses Zitronengelb mit Silberreflexen, in der Nase und am Gaumen: intensive Aromen von Steinobst (Pfirsich, Aprikose, Ringlotte), tropische Früchte (Melone, Litschi), Zitrus (Zitrone, Limette, Mandarine), Zitrusblüten, Apfel, Birne, Stachelbeere, am Gaumen: trocken mit mittlerer, frischer Säure bei mittlerem Körper mit zart cremigen Anklängen, mittlerer Alkohol, aromatisch um Mineralik und etwas weißen Pfeffer ergänzt, anhaltender Abgang, hervorragend rebsortentypisch</p>
            <p><strong>Trinktemperatur: 7 - 10 °C</strong></p>
          </div>
        </div>
      </main>
    </div>
  )
}
