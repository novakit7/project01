import img from '/about.png'
import '../App.css'

export default function About() {
  return (
    <section className="a-box">
      <div className="about">
        <span className="about-label">ABOUT US</span>
        <h1 className="about-title">Simplifying Task Management for Everyday Productivity</h1>
        <p className="about-text">
          We believe productivity should be simple, focused, and accessible. Our to-do list
          application is built to help users organize daily responsibilities, manage priorities,
          and stay aligned with their goals in a clear and efficient way.
        </p>
      </div>

      <div className="about-image-wrap">
        <img className="about-img" src={img} alt="About our productivity app" />
      </div>
    </section>
  )
}