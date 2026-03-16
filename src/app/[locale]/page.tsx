// Built-in
import { use } from "react"
import Image from "next/image"
import Link from "next/link"
// Libraries
import { Locale, useTranslations } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
// Components
import {
  AdSection,
  Container,
  Footer,
  GallerySlider,
  GridTwoCol,
  Hero,
  RotatingImage,
  ScrollScaleText,
} from "@/ui"
// Utils
import { buildPageMetadata } from "@/utils/metadata"
// Assets
import Premium from "@/assets/images/pentolo-premium.webp"
import Superior from "@/assets/images/pentolo-superior.webp"
import HeroBackground from "@/assets/images/pentolo-premium-superior.jpg"
import CookingPentolo from "@/assets/images/pentolo-cooking.webp"
import Brevetto from "@/assets/images/BREVETTO.webp"
import SlideOne from "@/assets/images/pentolo-slide-1.webp"
import SlideTwo from "@/assets/images/pentolo-slide-2.webp"
import SlideThree from "@/assets/images/pentolo-slide-3.webp"

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "IndexPage",
  })

  return buildPageMetadata({
    locale,
    pathname: "/",
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    ogTitle: t("meta.ogTitle"),
    ogDescription: t("meta.ogDescription"),
    ogImageAlt: t("meta.ogImageAlt"),
  })
}

/**
 * Homepage
 * This is the main landing page for the application, supporting localization
 */
export default function IndexPage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params)

  // Enable static rendering
  setRequestLocale(locale as Locale)

  const t = useTranslations("IndexPage")

  return (
    <main>
      <Hero
        overlay
        title={{
          start: t("hero.titleStart"),
          end: t("hero.titleEnd"),
        }}
        description={t("hero.description")}
        backgroundSrc={HeroBackground.src}
      />

      {/* Tutti attorno alla tua cucina */}
      <section className="pt-24 md:pt-32 mb-12 px-8 md:px-16">
        <Container>
          <GridTwoCol className="items-center">
            <div className="space-y-8">
              <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-black leading-tight">
                {t("heartOfEvent.title")}
              </ScrollScaleText>
              <div className="w-16 h-1.5 bg-primary rounded-full border border-black" />
            </div>
          </GridTwoCol>
        </Container>
      </section>

      {/* Gallery 1 */}
      <section className="px-8 md:px-16 mb-24 md:mb-32">
        <Container>
          <div className="lg:px-16">
            <GridTwoCol className="gap-6! items-start">
              <RotatingImage
                src={Premium.src}
                alt="Pentolo Event in action"
                priority
                height="700px"
                className="md:mt-20"
                asBackground
              />
              <div>
                <RotatingImage
                  src={Superior.src}
                  alt="Pentolo Event detail"
                  height="560px"
                  aspectRatio="16/9"
                  asBackground
                />
                <div className="leading-relaxed text-black/80 space-y-5 text-md md:text-lg mt-10">
                  <div>
                    <p>{t("heartOfEvent.p1")}</p>
                    <p>{t("heartOfEvent.p2a")}</p>
                    <p>{t("heartOfEvent.p2b")}</p>
                    <p>{t("heartOfEvent.p3a")}</p>
                    <p>{t("heartOfEvent.p3b")}</p>
                  </div>
                  <div>{t("heartOfEvent.p3c")}</div>
                  <div>
                    <p>{t("heartOfEvent.p4")}</p>
                    <p>{t("heartOfEvent.p5")}</p>
                  </div>
                </div>
              </div>
            </GridTwoCol>
          </div>
        </Container>
      </section>

      {/* Pentolo SUPERIOR */}
      <section className="py-24 md:py-40 px-8 md:px-16 bg-black text-white">
        <Container>
          <div className="text-center mb-20" id="choose-pentolo">
            <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-white leading-tight">
              {t("twoDimensions.sectionTitle")}
            </ScrollScaleText>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-8" />
          </div>

          {/* Responsive video: horizontal for desktop, vertical for mobile */}
          <div className="flex justify-center overflow-hidden rounded-xl">
            <video
              className="w-full shadow-lg hidden md:block"
              style={{
                borderRadius: "0.75rem",
                height: 560,
                objectFit: "cover",
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source
                src="/SUPERIOR-BLACK-ORIZZONTALE.webm"
                type="video/webm"
              />
              <source src="/SUPERIOR-BLACK-ORIZZONTALE.mp4" type="video/mp4" />
              {t("videoFallback")}
            </video>
            <video
              className="w-full max-w-md shadow-lg md:hidden"
              style={{
                borderRadius: "0.75rem",
                maxHeight: 560,
                objectFit: "cover",
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/SUPERIOR-BLACK-verticale.webm" type="video/webm" />
              <source src="/SUPERIOR-BLACK-verticale.mp4" type="video/mp4" />
              {t("videoFallback")}
            </video>
          </div>

          <GridTwoCol className="mt-16 items-start">
            <ScrollScaleText>
              <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight">
                {t("superior.diameter")} <br />
                {t("superior.productTitle")}
              </h3>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-6">
                {t("superior.subtitle")}
              </p>
            </ScrollScaleText>
            <ul className="space-y-5 md:mt-2">
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("superior.bullet1")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("superior.bullet2")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("superior.bullet3")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("superior.bullet4")}
              </li>
            </ul>
          </GridTwoCol>
          <div className="flex justify-center mt-16">
            <Link
              href="https://www.pentolo.com/checkout?add-to-cart=569"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-black text-sm font-semibold tracking-wider py-4 px-16 rounded-full border-2 border-primary hover:bg-black hover:border-white transition-all duration-300 hover:text-white"
            >
              {t("superior.cta")}
            </Link>
          </div>
        </Container>
      </section>

      {/* Pentolo PREMIUM */}
      <section className="pb-24 md:pb-40 px-8 md:px-16 bg-black text-white">
        <Container>
          {/* Responsive video: horizontal for desktop, vertical for mobile */}
          <div className="flex justify-center overflow-hidden rounded-xl">
            <video
              className="w-full shadow-lg hidden md:block"
              style={{
                borderRadius: "0.75rem",
                height: 560,
                objectFit: "cover",
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/PREMIUM-WHITE-ORIZZONTALE.webm" type="video/webm" />
              <source src="/PREMIUM-WHITE-ORIZZONTALE.mp4" type="video/mp4" />
              {t("videoFallback")}
            </video>
            <video
              className="w-full max-w-md shadow-lg md:hidden"
              style={{
                borderRadius: "0.75rem",
                maxHeight: 560,
                objectFit: "cover",
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/PREMIUM-WHITE-verticale.webm" type="video/webm" />
              <source src="/PREMIUM-WHITE-verticale.mp4" type="video/mp4" />
              {t("videoFallback")}
            </video>
          </div>
          <GridTwoCol className="mt-16 items-start">
            <ScrollScaleText>
              <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight">
                {t("premium.diameter")} <br />
                {t("premium.productTitle")}
              </h3>
              <p className="text-white/70 text-lg md:text-xl leading-relaxed mt-6">
                {t("premium.subtitle")}
              </p>
            </ScrollScaleText>
            <ul className="space-y-5 md:mt-2">
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("premium.bullet1")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("premium.bullet2")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("premium.bullet3")}
              </li>
              <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                {t("premium.bullet4")}
              </li>
            </ul>
          </GridTwoCol>
          <div className="flex justify-center mt-16">
            <Link
              href="https://www.pentolo.com/checkout?add-to-cart=70"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-black text-sm font-semibold tracking-wider py-4 px-16 rounded-full border-2 border-primary hover:bg-black hover:border-white transition-all duration-300 hover:text-white"
            >
              {t("premium.cta")}
            </Link>
          </div>
        </Container>
      </section>

      {/* Table */}
      <section className="py-24 md:py-40 px-8 md:px-16">
        <Container>
          <div className="text-center mb-20" id="choose-pentolo">
            <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-black leading-tight">
              {t("comparison.title")}
            </ScrollScaleText>
            <div className="w-20 h-1.5 bg-primary rounded-full mx-auto mt-8 border border-black" />
            <div className="leading-relaxed text-black/80 text-lg md:text-xl mt-5">
              {t("comparison.subtitle")}
            </div>
          </div>

          <div className="grid grid-cols-[1fr_210px_210px] md:max-w-215 mx-auto max-w-full border rounded-xl border-black/10 text-sm sm:text-[16px] overflow-y-auto!">
            {/* Header */}
            <div className="p-4 bg-black/3 font-semibold text-[17px] text-wrap">
              {t("comparison.colFeatures")}
            </div>
            <div
              className="p-4 bg-black/3 font-semibold text-[17px] text-wrap
            "
            >
              PENTOLO SUPERIOR
            </div>
            <div className="p-4 bg-black/3 font-semibold text-[17px]">
              PENTOLO PREMIUM
            </div>
            {/* Row 1 */}
            <div className="p-4 border-t border-black/5">
              {t("comparison.rowDiameter")}
            </div>
            <div className="p-4 border-t border-black/5">
              {t("comparison.superiorDiameter")}
            </div>
            <div className="p-4 border-t border-black/5">
              {t("comparison.premiumDiameter")}
            </div>
            {/* Row 2 */}
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.rowGuests")}
            </div>
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.superiorGuests")}
            </div>
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.premiumGuests")}
            </div>
            {/* Row 3 */}
            <div className="p-4 border-t border-black/5">
              {t("comparison.rowInstallation")}
            </div>
            <div className="p-4 border-t border-black/5">
              {t("comparison.superiorInstallation")}
            </div>
            <div className="p-4 border-t border-black/5">
              {t("comparison.premiumInstallation")}
            </div>
            {/* Row 4 */}
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.rowExperience")}
            </div>
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.superiorExperience")}
            </div>
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.premiumExperience")}
            </div>
            {/* Row 5 */}
            <div className="p-4 border-t border-black/5">
              {t("comparison.rowIdealFor")}
            </div>
            <div className="p-4 border-t border-black/5">
              {t("comparison.superiorIdealFor")}
            </div>
            <div className="p-4 border-t border-black/5">
              {t("comparison.premiumIdealFor")}
            </div>
            {/* Row 6 */}
            <div className="p-4 border-t border-black/5 bg-black/1">
              {t("comparison.rowPrice")}
            </div>
            <div className="p-4 border-t border-black/5 bg-black/1">
              <div className="font-semibold text-lg sm:text-xl">
                {t("comparison.superiorPrice")}
              </div>{" "}
              {t("comparison.vatIncluded")}
            </div>
            <div className="p-4 border-t border-black/5 bg-black/1">
              <div className="font-semibold text-lg sm:text-xl">
                {t("comparison.premiumPrice")}
              </div>{" "}
              {t("comparison.vatIncluded")}
            </div>
            {/* Row 7 */}
            <div className="p-4 pt-0" />
            <div className="p-4 pt-0">
              <Link
                href="https://www.pentolo.com/checkout?add-to-cart=569"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-black text-sm font-semibold tracking-wider py-1.5 px-2 rounded-lg border border-black hover:bg-black hover:border-white transition-all duration-300 hover:text-white"
              >
                {t("comparison.ctaBuy")}
              </Link>
            </div>
            <div className="p-4 pt-0">
              <Link
                href="https://www.pentolo.com/checkout?add-to-cart=70"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-black text-sm font-semibold tracking-wider py-1.5 px-2 rounded-lg border border-black hover:bg-black hover:border-white transition-all duration-300 hover:text-white"
              >
                {t("comparison.ctaBuy")}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Slider */}
      <section className="py-16 md:py-24 px-8 md:px-16">
        <Container>
          <div className="space-y-8 mx-auto text-center">
            <ScrollScaleText className="text-4xl md:text-6xl xl:text-7xl font-semibold text-black leading-tight">
              {t("features.titleLine1")} <br />
              {t("features.titleLine2")}
            </ScrollScaleText>
            <div className="w-16 h-1.5 bg-primary rounded-full border border-black mx-auto" />
          </div>

          <div className="max-w-130 mx-auto bg-black/3 rounded-3xl border border-black/10 mt-16">
            <GallerySlider
              slides={[
                { src: SlideOne.src, alt: "Pentolo cooking experience" },
                { src: SlideTwo.src, alt: "Pentolo detail" },
                { src: SlideThree.src, alt: "Pentolo in use" },
              ]}
              // className="mt-10"
            />

            <div className="flex flex-col text-xl items-center gap-4 text-center py-10 px-5">
              {t("features.description")}
            </div>
          </div>
        </Container>
      </section>

      {/* Table */}
      <section className="py-16 md:py-24 px-8 md:px-16">
        <Container>
          <GridTwoCol className="mt-0 items-start bg-black text-white p-16 rounded-3xl">
            <div>
              <div className="w-20 h-1.5 bg-primary rounded-full mb-8" />
              <h3 className="text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight">
                {t("bothVersions.title")}
              </h3>
            </div>
            <ScrollScaleText>
              <ul className="space-y-5 md:mt-2">
                <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                  {t("bothVersions.bullet1")}
                </li>
                <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                  {t("bothVersions.bullet2")}
                </li>
                <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                  {t("bothVersions.bullet3")}
                </li>
                <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                  {t("bothVersions.bullet4")}
                </li>
                <li className="flex items-center gap-4 text-lg md:text-xl font-medium">
                  <span className="w-3 h-3 bg-primary rounded-full shrink-0" />
                  {t("bothVersions.bullet5")}
                </li>
              </ul>
            </ScrollScaleText>
          </GridTwoCol>
        </Container>
      </section>

      {/* Brevetto */}
      <section className="py-8 md:py-16 px-8 md:px-16">
        <Container>
          <div className="flex justify-center">
            <Image
              src={Brevetto.src}
              alt="Brevetto Pentolo"
              width={Brevetto.width}
              height={Brevetto.height}
              className="rounded-3xl w-full max-w-2xl object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Ad — Explore Ecosystem */}
      <AdSection
        texts={{
          first: t("ad.first"),
          firstPartTwo: t("ad.firstPartTwo"),
          second: t("ad.second"),
          third: t("ad.third"),
        }}
        imageSrc={CookingPentolo.src}
        imageAlt="Pentolo Event in action"
      />

      {/* Footer */}
      <Footer />
    </main>
  )
}
