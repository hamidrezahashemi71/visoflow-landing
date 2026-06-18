'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

// ─── Types ───────────────────────────────────────────────────────────────────

export type LumiState = 'idle' | 'thinking' | 'excited' | 'concerned'

interface LumiCharacterProps {
  /** Animation state — change this prop to switch expressions */
  state?: LumiState
  /** Rendered width in px. Height scales automatically. Default: 280 */
  width?: number
  className?: string
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function LumiCharacter({
  state = 'idle',
  width = 280,
  className,
}: LumiCharacterProps) {
  const svgRef    = useRef<SVGSVGElement>(null)
  const tlsRef    = useRef<gsap.core.Timeline[]>([])   // tracked timelines for cleanup

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Scope all selectors to this SVG instance (safe for multiple Lumi on page)
    const q  = (id: string) => svg.querySelector<SVGElement>(`#${id}`)
    const qa = (ids: string[]) =>
      ids.flatMap(id => Array.from(svg.querySelectorAll<SVGElement>(`#${id}`)))

    const ALL_IDS = [
      'Lumi',
      'LeftEyelid', 'RightEyelid',
      'LeftEyebrow', 'RightEyebrow',
      'LeftEye', 'RightEye',
      'LeftEyeIris', 'LeftEyePupil', 'LeftEyeHighlight',
      'RightEyeIris', 'RightEyePupil', 'RightEyeHighlight',
      'Mouth',
      'HairFrontLeft', 'HairFrontRight',
      'HairTopLeft', 'HairTopCenter', 'HairTopRight',
      'LeftEar', 'RightEar',
      'Sparkle',
    ]
    const ALL = qa(ALL_IDS)

    // Respect prefers-reduced-motion: keep the one-shot pose tweens that set
    // each expression, but drop the looping/yoyo repeats so Lumi settles into a
    // static pose instead of animating continuously.
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const noLoop = <T extends gsap.TweenVars | gsap.TimelineVars>(vars: T): T =>
      reduced ? { ...vars, repeat: 0, yoyo: false, repeatDelay: 0 } : vars
    const to = (target: gsap.TweenTarget, vars: gsap.TweenVars) =>
      gsap.to(target, noLoop(vars))
    const tl = (vars: gsap.TimelineVars = {}) => gsap.timeline(noLoop(vars))

    // Track repeating timelines so we can kill them on state change
    function track(tl: gsap.core.Timeline) {
      tlsRef.current.push(tl)
      return tl
    }

    // Kill everything and smooth-reset to neutral, then run new state
    function resetThen(fn: () => void) {
      tlsRef.current.forEach(tl => tl.kill())
      tlsRef.current = []
      gsap.killTweensOf(ALL)
      to(ALL, {
        x: 0, y: 0, rotation: 0, scaleX: 1, scaleY: 1, opacity: 1,
        duration: 0.25, ease: 'power2.inOut', overwrite: true,
        onComplete: fn,
      })
    }

    // ── IDLE ─────────────────────────────────────────────────────────────────

    function idle() {
      // Float
      to(q('Lumi'), {
        y: -6, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut',
      })

      // Blink — fast close, slower open
      const blink = track(tl({ repeat: -1, repeatDelay: 2.7 }))
      blink
        .to(qa(['LeftEyelid', 'RightEyelid']), { y: 58, duration: 0.10, ease: 'power2.in' })
        .to(qa(['LeftEyelid', 'RightEyelid']), { y: 0,  duration: 0.25, ease: 'power2.out' })

      // Hair drift — different speed per side
      to(q('HairFrontLeft'),  { rotation: 1.5,  transformOrigin: '50% 0%', duration: 2.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      to(q('HairFrontRight'), { rotation: -1.5, transformOrigin: '50% 0%', duration: 2.4, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.3 })

      // Crown breath
      to(q('HairTopCenter'), { scaleY: 1.03, transformOrigin: '50% 100%', duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }

    // ── THINKING ─────────────────────────────────────────────────────────────

    function thinking() {
      const pupils = qa(['LeftEyeIris', 'LeftEyePupil', 'LeftEyeHighlight',
                         'RightEyeIris', 'RightEyePupil', 'RightEyeHighlight'])

      // Head tilt, then slow float from tilted position
      to(q('Lumi'), {
        rotation: 4.5, transformOrigin: 'center center', duration: 0.5, ease: 'power2.out',
        onComplete() {
          to(q('Lumi'), { y: -3, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
        },
      })

      // Half-squint
      to(qa(['LeftEyelid', 'RightEyelid']), { y: 15, duration: 0.4, ease: 'power2.out' })

      // Right eyebrow raised + subtle pulse
      to(q('RightEyebrow'), { y: -7, duration: 0.4, ease: 'power2.out' })
      track(tl({ repeat: -1, yoyo: true }))
        .to(q('RightEyebrow'), { y: -10, duration: 1.5, ease: 'sine.inOut' })

      // Pupils drift up-left (searching for answer) then return
      const gaze = track(tl({ repeat: -1 }))
      gaze
        .to(pupils, { x: -4, y: -6, duration: 1.5, ease: 'sine.inOut' })
        .to(pupils, { x: -2, y: -3, duration: 1.0, ease: 'sine.inOut' })
        .to(pupils, { x:  0, y:  0, duration: 0.8, ease: 'sine.inOut' })
        .to({},     { duration: 0.6 })

      // Mouth — neutral line
      to(q('Mouth'), { scaleX: 0.35, transformOrigin: 'center center', duration: 0.4, ease: 'power2.out' })

      // Lazy hair drift
      to(q('HairFrontLeft'),  { rotation: 1.2,  transformOrigin: '50% 0%', duration: 2.8, yoyo: true, repeat: -1, ease: 'sine.inOut' })
      to(q('HairFrontRight'), { rotation: -1.2, transformOrigin: '50% 0%', duration: 3.1, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.5 })
    }

    // ── EXCITED ───────────────────────────────────────────────────────────────

    function excited() {
      // Fast bounce
      to(q('Lumi'), { y: -10, duration: 0.5, yoyo: true, repeat: -1, ease: 'power2.inOut' })

      // Both eyebrows up
      to(qa(['LeftEyebrow', 'RightEyebrow']), { y: -9, duration: 0.3, ease: 'back.out(2)' })

      // Eyes scale with bounce
      const eyeScale = track(tl({ repeat: -1 }))
      eyeScale
        .to(qa(['LeftEye', 'RightEye']), { scale: 1.12, transformOrigin: 'center center', duration: 0.5, ease: 'power2.inOut' })
        .to(qa(['LeftEye', 'RightEye']), { scale: 1,    duration: 0.5, ease: 'power2.inOut' })

      // Highlight sparkle — the joy signal
      const sparkEye = track(tl({ repeat: -1 }))
      sparkEye
        .to(qa(['LeftEyeHighlight', 'RightEyeHighlight']), { scale: 2.0, transformOrigin: 'center center', duration: 0.5, ease: 'power2.inOut' })
        .to(qa(['LeftEyeHighlight', 'RightEyeHighlight']), { scale: 1,   duration: 0.5, ease: 'power2.inOut' })

      // Ears spread
      to(qa(['LeftEar', 'RightEar']), { scaleX: 1.15, transformOrigin: 'center center', duration: 0.5, yoyo: true, repeat: -1, ease: 'power2.inOut' })

      // Hair whips
      to(q('HairFrontLeft'),  { rotation: 3,  transformOrigin: '50% 0%', duration: 0.5, yoyo: true, repeat: -1, ease: 'power2.inOut' })
      to(q('HairFrontRight'), { rotation: -3, transformOrigin: '50% 0%', duration: 0.5, yoyo: true, repeat: -1, ease: 'power2.inOut' })

      // Sparkle pulses
      to(q('Sparkle'), { scale: 1.35, transformOrigin: 'center center', duration: 0.5, yoyo: true, repeat: -1, ease: 'power2.inOut' })
    }

    // ── CONCERNED ────────────────────────────────────────────────────────────

    function concerned() {
      const pupils = qa(['LeftEyeIris', 'LeftEyePupil', 'LeftEyeHighlight',
                         'RightEyeIris', 'RightEyePupil', 'RightEyeHighlight'])

      // Slow melancholy float
      to(q('Lumi'), { y: -4, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut' })

      // Eyebrows — ∧ worried shape (inner corners raised)
      to(q('LeftEyebrow'),  { rotation: -12, y: 3, transformOrigin: '0% 50%',   duration: 0.5, ease: 'power2.out' })
      to(q('RightEyebrow'), { rotation:  12, y: 3, transformOrigin: '100% 50%', duration: 0.5, ease: 'power2.out' })

      // Pupils — downward sad gaze
      to(pupils, { y: 4, duration: 0.5, ease: 'power2.out' })

      // Mouth — flip smile to frown
      // Adjust y (-14) if the frown sits too low on her face
      to(q('Mouth'), {
        scaleX: 0.7, scaleY: -1, y: -14,
        transformOrigin: 'center center',
        duration: 0.5, ease: 'power2.out',
      })

      // Hair droops
      to(q('HairFrontLeft'),  { rotation: -2.5, transformOrigin: '50% 0%', duration: 0.8, ease: 'power2.out' })
      to(q('HairFrontRight'), { rotation:  2.5, transformOrigin: '50% 0%', duration: 0.8, ease: 'power2.out' })

      // Heavy slow sway after droop settles
      track(tl({ repeat: -1, yoyo: true, delay: 0.9 }))
        .to(q('HairFrontLeft'),  { rotation: -1.5, transformOrigin: '50% 0%', duration: 3.0, ease: 'sine.inOut' })
      track(tl({ repeat: -1, yoyo: true, delay: 1.2 }))
        .to(q('HairFrontRight'), { rotation:  1.5, transformOrigin: '50% 0%', duration: 3.3, ease: 'sine.inOut' })
    }

    // Run
    const states = { idle, thinking, excited, concerned }
    resetThen(() => states[state]())

    // Cleanup on unmount or state change
    return () => {
      tlsRef.current.forEach(tl => tl.kill())
      gsap.killTweensOf(ALL)
    }
  }, [state])

  // ── SVG ──────────────────────────────────────────────────────────────────

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 440 480"
      width={width}
      style={{ height: 'auto', overflow: 'visible' }}
      className={className}
      aria-label="Lumi character"
      role="img"
    >
      <g id="Lumi">
        <g id="HairBack">
          <ellipse cx={220} cy={225} rx={161} ry={137} fill="#946024" stroke="#693C12" strokeWidth={8}/>
        </g>
        <g id="Head">
          <circle cx={220} cy={286} r={140} fill="#FFC858" stroke="#CD9426" strokeWidth={18}/>
          <ellipse cx={191} cy={242} rx={39} ry={42} fill="#FFE99A" fillOpacity={0.30} id="HeadHighlight"/>
        </g>
        <g id="LeftEar">
          <ellipse cx={68}  cy={325} rx={30} ry={18} fill="#FFC858" stroke="#CD9426" strokeWidth={12}/>
        </g>
        <g id="RightEar">
          <ellipse cx={372} cy={325} rx={30} ry={18} fill="#FFC858" stroke="#CD9426" strokeWidth={12}/>
        </g>
        <g id="HairFrontLeft">
          <ellipse cx={108} cy={264} rx={26} ry={111} fill="#946024" stroke="#693C12" strokeWidth={8}/>
        </g>
        <g id="HairFrontRight">
          <ellipse cx={332} cy={264} rx={26} ry={111} fill="#946024" stroke="#693C12" strokeWidth={8}/>
        </g>
        <g id="CheekLeft">
          <ellipse cx={160} cy={334} rx={29} ry={16} fill="#FFDC9B" fillOpacity={0.40}/>
        </g>
        <g id="CheekRight">
          <ellipse cx={280} cy={334} rx={29} ry={16} fill="#FFDC9B" fillOpacity={0.40}/>
        </g>
        <g id="Mouth">
          <path d="M 171,365 A 49,28 0 0 0 269,365" stroke="#12090E" strokeWidth={7} strokeLinecap="round" fill="none"/>
        </g>
        <g id="LeftEye">
          <ellipse id="LeftEyeWhite"     cx={181} cy={302} rx={28} ry={29} fill="#FFFEF8"/>
          <circle  id="LeftEyeIris"      cx={181} cy={302} r={19}  fill="#9E5210"/>
          <circle  id="LeftEyePupil"     cx={181} cy={302} r={10}  fill="#12090E"/>
          <circle  id="LeftEyeHighlight" cx={178} cy={299} r={4}   fill="white"/>
        </g>
        <g id="RightEye">
          <ellipse id="RightEyeWhite"     cx={259} cy={302} rx={28} ry={29} fill="#FFFEF8"/>
          <circle  id="RightEyeIris"      cx={259} cy={302} r={19}  fill="#9E5210"/>
          <circle  id="RightEyePupil"     cx={259} cy={302} r={10}  fill="#12090E"/>
          <circle  id="RightEyeHighlight" cx={256} cy={299} r={4}   fill="white"/>
        </g>
        <g id="Eyelids">
          <ellipse id="LeftEyelid"  cx={181} cy={244} rx={28} ry={29} fill="#FFC858"/>
          <ellipse id="RightEyelid" cx={259} cy={244} rx={28} ry={29} fill="#FFC858"/>
        </g>
        {/* Eyebrows after eyelids — always renders on top */}
        <g id="LeftEyebrow">
          <path d="M 160,265 Q 181,259 202,265" stroke="#12090E" strokeWidth={5} strokeLinecap="round" fill="none"/>
        </g>
        <g id="RightEyebrow">
          <path d="M 238,265 Q 259,259 280,265" stroke="#12090E" strokeWidth={5} strokeLinecap="round" fill="none"/>
        </g>
        <g id="HairTopLeft">
          <ellipse cx={156} cy={127} rx={35} ry={28} fill="#946024" stroke="#693C12" strokeWidth={8}/>
        </g>
        <g id="HairTopCenter">
          <ellipse cx={220} cy={104} rx={50} ry={36} fill="#946024" stroke="#693C12" strokeWidth={8}/>
        </g>
        <g id="HairTopRight">
          <ellipse cx={284} cy={127} rx={35} ry={28} fill="#946024" stroke="#693C12" strokeWidth={8}/>
        </g>
        <g id="Sparkle">
          <circle cx={259} cy={125} r={7} fill="#FFF6C4"/>
          <polygon points="259,113 262.54,121.46 271,125 262.54,128.54 259,137 255.46,128.54 247,125 255.46,121.46" fill="#FFF6C4"/>
        </g>
      </g>
    </svg>
  )
}
