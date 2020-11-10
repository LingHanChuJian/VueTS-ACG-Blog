/**
 * {@link https://github.com/disjukr/activate-power-mode/blob/gh-pages/src/index.js}
 */

import { getCaretCoordinates } from '@/utils/textareaCaretPosition'
import { InputCoordinates, BasicParticleInformation, ParticleInformation } from '@/types/utils'

let canvas: HTMLCanvasElement = document.createElement('canvas')
const queryCanvas: Element | null = document.querySelector('canvas#activate-power-mode')

if (!queryCanvas) {
    canvas.id = 'activate-power-mode'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:999999'

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })

    document.body.appendChild(canvas)
} else {
    canvas = queryCanvas as HTMLCanvasElement
}

const context: CanvasRenderingContext2D | null = canvas.getContext('2d')

const particles: ParticleInformation[] = []
let particlePointer: number = 0
let rendering: boolean = false

const getRandom = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
}

const getColor = (element: HTMLElement) => {
    const isColorful: boolean = !!element.dataset.hasOwnProperty('colorful')

    if (!isColorful) {
        const random = getRandom(0, 360)
        return `hsla(${getRandom(random - 10, random + 10)}, 100%, ${getRandom(50, 80)}%, 1)`
    }

    return getComputedStyle(element).color
}

const getActiveElement = (): Element | null => {
    return document.activeElement
}

const getBasicParticleInformation = (): BasicParticleInformation => {
    let bcr: DOMRect | undefined
    const el: Element | null = getActiveElement()
    if (el && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && el.getAttribute('type') === 'text'))) {
        const offset: InputCoordinates = getCaretCoordinates(el as HTMLTextAreaElement | HTMLInputElement, (el as HTMLTextAreaElement | HTMLInputElement).selectionEnd || 0)
        bcr = el.getBoundingClientRect()
        return {
            x: offset.left + bcr.left,
            y: offset.top + bcr.top,
            color: getColor(el as HTMLElement),
        }
    }

    const selection: Selection | null = window.getSelection()

    if (selection && selection.rangeCount) {
        const range: Range = selection.getRangeAt(0)
        let startNode = range.startContainer
        if (startNode.nodeType === document.TEXT_NODE) { startNode = startNode.parentNode! }
        bcr = range.getBoundingClientRect()
        return {
            x: bcr.left,
            y: bcr.top,
            color: getColor(startNode as HTMLElement),
        }
    }

    return { x: 0, y: 0, color: 'transparent' }
}

const createParticle = (param: BasicParticleInformation): ParticleInformation => {
    const { x, y, color } = param
    return {
        x,
        y,
        alpha: 1,
        color,
        velocity: {
            x: getRandom(-1, 1),
            y: getRandom(-3.5, -1.5),
        },
    }
}

const loop = () => {
    rendering = true
    if (!context) { return }
    context.clearRect(0, 0, canvas.width, canvas.height)
    let rendered: boolean = false
    const rect: DOMRect = canvas.getBoundingClientRect()
    for (let i = 0, len = particles.length; i < len; ++i) {
        const particleInformation: ParticleInformation = particles[i]
        if (particleInformation.alpha <= 0.1) { continue }
        particleInformation.velocity.y += 0.075
        particleInformation.x += particleInformation.velocity.x
        particleInformation.y += particleInformation.velocity.y
        particleInformation.alpha *= 0.96
        context.globalAlpha = particleInformation.alpha
        context.fillStyle = particleInformation.color
        context.fillRect(
            Math.round(particleInformation.x - 1.5) - rect.left,
            Math.round(particleInformation.y - 1.5) - rect.top,
            3,
            3,
        )
        rendered = true
    }
    if (rendered) {
        requestAnimationFrame(loop)
    } else {
        rendering = false
    }
}

export const activatePowerMode = (): void => {
    const basicParticleInformation: BasicParticleInformation = getBasicParticleInformation()
    let numParticles: number = Math.round(getRandom(5, 15))
    while (numParticles--) {
        particles[particlePointer] = createParticle(basicParticleInformation)
        particlePointer = (particlePointer + 1) % 500
    }

    const el: Element | null = getActiveElement()
    if (el && (el as HTMLElement).dataset.hasOwnProperty('shake')) {
        const intensity: number = getRandom(1, 3)
        const x: number = intensity * (Math.random() > 0.5 ? -1 : 1)
        const y: number = intensity * (Math.random() > 0.5 ? -1 : 1)
        document.body.style.marginLeft = x + 'px'
        document.body.style.marginTop = y + 'px'
        setTimeout(() => {
            document.body.style.marginLeft = ''
            document.body.style.marginTop = ''
        }, 75)
    }

    if (!rendering) {
        requestAnimationFrame(loop)
    }
}
