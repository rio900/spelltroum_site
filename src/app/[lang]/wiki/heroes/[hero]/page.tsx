import type { Metadata } from 'next';
import { Locale, isValidLocale, locales } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { heroes, getHeroById, rarityColors, rarityLabels, roleLabels } from '@/data/heroes';
import { items } from '@/data/items';
import ItemIcon from '@/components/wiki/ItemIcon';
import { getHeroContent } from '@/data/content';

interface HeroPageProps {
  params: Promise<{ lang: string; hero: string }>;
}

export async function generateStaticParams() {
  return heroes.map((h) => ({ hero: h.id }));
}

export async function generateMetadata({ params }: HeroPageProps): Promise<Metadata> {
  const { lang, hero: heroSlug } = await params;
  const hero = getHeroById(heroSlug);
  if (!hero) return {};

  const t = isValidLocale(lang) ? await getTranslations(lang as Locale) : null;
  const th = t?.heroes;

  const metaTitle = th?.metaTitle
    ? th.metaTitle.replace('{name}', hero.name)
    : `${hero.name} — Hero Guide`;
  const metaDesc = th?.metaDescription
    ? th.metaDescription.replace('{name}', hero.name)
    : `Learn about ${hero.name} in Spelltroum — abilities, best builds, strengths, weaknesses, and tips.`;
  const metaGuide = th?.metaGuide ?? 'Hero Guide';

  const content = isValidLocale(lang) ? await import('@/data/content').then(m => m.getHeroContent(hero.id, lang as Locale)) : null;
  const description = (content?.overview ?? hero.overview ?? metaDesc).slice(0, 160);

  return {
    title: `${metaTitle} | Spelltroum`,
    description: description || metaDesc,
    keywords: [
      `Spelltroum ${hero.name}`,
      `${hero.name} ${metaGuide.toLowerCase()}`,
      `${hero.name} build`,
      `${hero.name} abilities`,
      `Spelltroum ${metaGuide.toLowerCase()}`,
    ],
    alternates: {
      canonical: `https://spelltroum.com/${lang}/wiki/heroes/${hero.id}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}/wiki/heroes/${hero.id}`])),
    },
    openGraph: {
      title: `${hero.name} — Spelltroum ${metaGuide}`,
      description: description || metaDesc,
      url: `https://spelltroum.com/${lang}/wiki/heroes/${hero.id}`,
      type: 'article',
    },
  };
}

// Translations data inline (from CSV)
const heroAbilityTranslations: Record<string, string> = {
    BonikAutoattackTitle: 'Basic Attack',
    BonikAutoattackDescription: 'Passive. Spitfire fires a flaming arrow. In addition to dealing Physical Damage, every attack also deals bonus Magic Damage. This allows Spitfire to pressure enemies even when they invest heavily into Physical Armor. His attacks naturally scale well with both Attack Speed and Spell Power builds.',
    BonikAttackSpeedTitle: 'Arrowstorm',
    BonikAttackSpeedDescription: 'Active Ability. Spitfire releases a flaming projectile in every direction around him. The ability also grants a powerful Attack Speed bonus. At Level 3, Arrowstorm additionally grants Attack Speed to nearby allies. This makes the ability useful both for personal damage and for supporting teammates during fights. Arrowstorm can also help clear bushes faster by hitting multiple targets simultaneously.',
    BonikFireballTitle: 'Fireball',
    BonikFireballDescription: 'Active Ability. Spitfire launches a Fireball that explodes on impact, dealing Magic Damage in an area. Excellent for clearing bushes, farming groups of targets, and damaging multiple enemies. At Level 3, Fireball becomes significantly stronger and launches Fireballs in multiple directions at once, allowing Spitfire to clear large portions of the battlefield extremely quickly.',
    SuperSpellBonik: 'Infernal Barrage. Unlocked when Spitfire reaches Hero Power 9. Once unlocked, reaching Level 10 during a match upgrades Arrowstorm even further. While Arrowstorm is active, Spitfire continuously fires arrows in all directions around him. This transforms him into a devastating area-damage machine capable of controlling large sections of the battlefield.',

    QuopAutoattackTitle: 'Poison Dagger',
    QuopAutoattackDescription: 'Basic Attack. Viverna\'s attacks poison enemies. Poison deals damage over time for 4 seconds, allowing Viverna to damage opponents even after disengaging. This makes every successful attack valuable and forces enemies to either retreat or continue fighting while taking damage. Poison also prevents enemies from comfortably regenerating Health between trades.',
    QuopBlinkTitle: 'Blink',
    QuopBlinkDescription: 'Active Ability. Viverna instantly teleports a short distance. Blink can be used to engage enemies, escape dangerous situations, dodge projectiles, reposition during fights, and cross obstacles quickly. This ability gives Viverna exceptional mobility and makes her one of the hardest heroes in Spelltroum to pin down.',
    QuopDamageTitle: 'Cross Blast',
    QuopDamageDescription: 'Active Ability. Viverna releases a magical explosion around herself that deals Magic Damage to nearby enemies. Cross Blast has an extremely short cooldown and serves as Viverna\'s primary damage ability. Effective for farming bushes, clearing neutral creeps, harassing enemies, and finishing low-health targets. At Level 3, reaches only a 3-second cooldown, allowing Viverna to continuously pressure opponents.',
    SuperSpellQuop: 'Venom Wall. Unlocked when Viverna reaches Hero Power 9. Once unlocked, reaching Level 10 during a match upgrades Blink. Whenever Viverna uses Blink, a magical wall is created between her starting and ending position. Projectiles that travel through the wall become significantly slowed, giving Viverna additional time to reposition while ranged heroes struggle to trade effectively.',

    SkeletAutoattackTitle: 'Basic Attack',
    SkeletAutoattackDescription: 'Passive. Death Slayer\'s basic attacks have additional Critical Chance. This makes his attacks more dangerous than they may seem, especially when combined with critical damage or lifesteal items. Because he is a melee hero, he needs to reach enemies before he can fully use this strength.',
    SkeletStunTitle: 'Stun',
    SkeletStunDescription: 'Active Ability. Death Slayer releases stunning projectiles in all directions. Enemies hit by these projectiles take damage and become stunned for a short duration. This ability can be used to catch enemies, interrupt attacks, escape dangerous situations, protect allies, and start fights. A well-timed Stun can completely change the outcome of a fight.',
    SkeletLifestealTitle: 'Lifesteal Aura',
    SkeletLifestealDescription: 'Passive Aura. Death Slayer provides Lifesteal to himself and nearby allies. This aura allows affected heroes to restore Health when damaging enemy heroes or neutral creeps. Lifesteal does not work on bushes. Because Lifesteal effects stack, Death Slayer can become extremely difficult to kill when combined with Lifesteal items or heroes that benefit from sustained combat.',
    SuperSpellSkelet: 'Last Stand. Unlocked when Death Slayer reaches Hero Power 9. Once unlocked, reaching Level 10 during a match grants Death Slayer a powerful survival mechanic. Whenever his Health falls below 25%, he automatically gains a protective shield that grants 100 Armor. This shield often prevents enemies from finishing him off when they think the fight is already won. The effect makes Death Slayer extremely dangerous in late-game fights, especially during extended duels.',

    FutionAutoattackTitle: 'Basic Attack',
    FutionAutoattackDescription: 'Passive. Druid throws an enchanted sickle. Each attack has a 50% chance to deal additional damage and create a bush behind the target based on the projectile direction. If an enemy is fighting near walls or obstacles, the newly created bush can block escape routes and trap them. The bush can also immediately be transformed into a summoned creep, allowing Druid to suddenly create a 2-versus-1 fight.',
    FutionCreepTitle: 'Summon Creep',
    FutionCreepDescription: 'Active Ability. Druid transforms a bush into an allied monster. The summoned creep fights alongside Druid and can help farm bushes, pressure enemy heroes, block movement, and secure kills. Because Druid can create bushes himself, he can often summon creeps exactly where he wants them. A well-placed creep can completely change the outcome of a fight.',
    FutionSpeedTitle: 'Speed Aura',
    FutionSpeedDescription: 'Passive Aura. Druid constantly increases the movement speed of himself and nearby allies, including summoned creeps. The aura allows Druid and his team to rotate faster, escape dangerous situations, chase enemies more effectively, and farm the map more efficiently. Speed Aura is one of the strongest utility abilities in Spelltroum because movement speed is useful during every stage of the match.',
    SuperSpellFurion: 'Mega Creep. Unlocked when Druid reaches Hero Power 9. Once unlocked, reaching Level 10 during a match upgrades Druid\'s summoned creature into a Mega Creep with 20% increased Health. This makes Druid\'s summons significantly harder to kill and much more impactful during late-game fights.',

    FriziAutoattackTitle: 'Basic Attack',
    FriziAutoattackDescription: 'Passive. Freezi fires an Ice Arrow. Each successful attack increases her Attack Speed against that target. The longer she is allowed to continuously attack, the faster she becomes. This makes Freezi extremely dangerous during extended engagements and one of the strongest single-target damage dealers in Spelltroum.',
    FriziStunTitle: 'Frost Strike',
    FriziStunDescription: 'Active Ability. Freezi throws an Ice Crystal that explodes on impact. Enemies hit by the explosion take damage and become stunned. At Level 1, Frost Strike provides a short stun. At Level 3, the stun duration increases to 2 seconds — often enough for Freezi to completely eliminate fragile targets before they can react. Frost Strike is one of the strongest crowd-control abilities in the game.',
    FriziDamageTitle: 'Aura of Empowerment',
    FriziDamageDescription: 'Passive Aura. Freezi constantly increases the Attack Damage of herself and nearby allies. Freezi receives the largest benefit from the aura, but all nearby teammates gain bonus damage as well. This makes her valuable not only as a carry but also as a strong team-oriented hero. The aura scales especially well with heroes that attack quickly or rely heavily on Physical Damage.',
    SuperSpellFrizi: 'Ricochet Shot. Unlocked when Freezi reaches Hero Power 9. Once unlocked, reaching Level 10 during a match grants a new passive effect. Freezi\'s attacks gain a 50% chance to ricochet to the nearest enemy. Enemies can no longer safely stand close together because a single attack can damage multiple targets. The effect turns Freezi into one of the strongest late-game carries in Spelltroum.',

    WarlockBasicAttackTitle: 'Basic Attack',
    WarlockBasicAttackDescription: 'Passive. Flameweaver\'s Basic Attack deals additional damage based on his current Mana. The more Mana he has available, the stronger his attacks become. This creates a unique playstyle where Mana acts as both a resource and a damage amplifier. Because the bonus damage is based on current Mana, Flameweaver becomes significantly weaker if he spends too much Mana carelessly. Proper Mana management is one of the keys to mastering the hero.',
    WarlockFireLineTitle: 'Path of Fire',
    WarlockFireLineDescription: 'Active Ability. Flameweaver creates a line of fire in front of him. The fire remains on the battlefield for several seconds. Enemies standing in the flames take periodic True Damage. Path of Fire can be used to control space, block enemy movement, defend objectives, escape pursuers, and force enemies into unfavorable positions. Heroes that rely on direct melee engagements often struggle to fight through the fire.',
    WarlockHideTitle: 'Portal',
    WarlockHideDescription: 'Active Ability. Flameweaver creates a pair of connected portals. Any unit that enters one portal instantly exits through the other, providing incredible mobility and allowing unexpected plays. Enemies that travel through the portals lose Mana — stolen Mana is transferred to Flameweaver. This allows him to sustain his Mana pool, increase his Basic Attack damage, and punish Mana-dependent heroes. Portal management is one of the most skill-intensive mechanics in Spelltroum.',
    SuperSpellWarlock: 'Expanded Fire Path. Unlocked when Flameweaver reaches Hero Power 9. Once unlocked, reaching Level 10 upgrades Path of Fire. The flames now spread into the two adjacent cells directly in front of Flameweaver, creating a much wider area. Enemies attempting to sidestep the original fire path often end up walking directly into the additional flames. The upgrade dramatically improves zoning potential and makes escaping his fire much more difficult.',

    ShadowAutoattackTitle: 'Basic Attack',
    ShadowAutoattackDescription: 'Passive. Shadow Fury fires empowered bolts that deal increased Physical Damage. Each attack also reduces the target\'s Physical Armor, making subsequent hits deal more damage. Her attacks scale exceptionally well with Physical Damage, Critical Chance, and Critical Damage bonuses. Because all of her damage is physical, item selection is extremely important.',
    ShadowDamageProtectionTitle: 'Orb Shield',
    ShadowDamageProtectionDescription: 'Active Ability. Shadow Fury creates a protective shield that blocks 100% of incoming damage. Each blocked attack or damaging ability consumes one shield charge. At Level 1, Orb Shield blocks a single hit. At Level 3, Orb Shield can block up to three hits. After Orb Shield activates, Shadow Fury gains a temporary Movement Speed boost, allowing her to reposition or escape danger.',
    ShadowHiddenAttackTitle: 'Shadow Cloak',
    ShadowHiddenAttackDescription: 'Active Ability. Shadow Fury becomes invisible for a short duration. While invisible, she prepares a devastating empowered attack. The first attack after leaving invisibility deals additional damage based on the target\'s current Health — the healthier the target, the more bonus damage they receive. This makes Shadow Fury especially effective against heroes with large Health pools but low armor. Shadow Cloak is the foundation of Shadow Fury\'s assassin playstyle.',
    SuperSpellShadow: 'Shadow Hunter. Unlocked when Shadow Fury reaches Hero Power 9. Once unlocked, reaching Level 10 grants two powerful bonuses: Shadow Fury gains bonus gold whenever she kills an enemy hero, and every 75 unspent gold grants additional damage up to a maximum of +60 damage. The ability rewards aggressive players who secure kills and continue snowballing their advantage.',

    SpiritmongerAutoattackTitle: 'Basic Attack',
    SpiritmongerAutoattackDescription: 'Basic Attack. Spiritmonger throws an enchanted fan that collects Souls from defeated enemies, creeps, and bushes. Each Soul grants +10 Attack Damage. The more Souls she collects, the stronger her Basic Attack becomes. When Spiritmonger dies, she normally loses half of her collected Souls — creating a balance between aggressive farming and staying alive.',
    SpiritmongerDamageTitle: 'Soul Orb',
    SpiritmongerDamageDescription: 'Active Ability. Spiritmonger launches a magical orb that bounces between targets — enemy heroes, bushes, and other valid targets. Enemies positioned near bushes can be hit multiple times by the same orb. A properly placed Soul Orb can deal massive damage and is one of Spiritmonger\'s strongest abilities. The orb becomes especially dangerous in tight areas where enemies can become trapped between obstacles.',
    SpiritmongerSpeedTitle: 'Velocity',
    SpiritmongerSpeedDescription: 'Active Ability. Spiritmonger gains increased Movement Speed for a short duration. At Level 3, Velocity also grants Movement Speed to nearby allies, making Spiritmonger one of the strongest mobility supports in Spelltroum. Can be used to chase enemies, escape dangerous situations, reposition during fights, or help teammates engage and retreat.',
    SuperSpellSpiritmonger: 'Soul Keeper. Unlocked when Spiritmonger reaches Hero Power 9. Once unlocked, reaching Level 10 during a match grants a powerful bonus — Spiritmonger no longer loses any Souls upon death. This dramatically increases her late-game potential because she can continue scaling without risking her accumulated damage. A Level 10 Spiritmonger with a large number of Souls can become one of the most threatening carries in the game.',

    MortifierAutoattackTitle: 'Basic Attack',
    MortifierAutoattackDescription: 'Basic Attack. Mortifier\'s attacks have a chance to instantly reset their cooldown and strike again. The second attack deals additional Physical Damage and restores Health to Mortifier. Because of this mechanic, Mortifier can become surprisingly dangerous in direct melee combat. When built as a Physical Damage hero, repeated double attacks allow him to deal massive sustained damage while healing himself at the same time.',
    MortifierSwapTitle: 'Swap',
    MortifierSwapDescription: 'Active Ability. Mortifier instantly swaps positions with a selected target — enemy heroes, allied heroes, or various objects on the map. The ability also deals damage to the target. Swap is one of the most versatile abilities in Spelltroum. It can be used offensively to drag enemies into danger or defensively to save teammates from certain death.',
    MortifierMineTitle: 'Blast Trap',
    MortifierMineDescription: 'Active Ability. Mortifier places an explosive trap beneath himself. The trap detonates when an enemy enters its trigger range or its timer expires. The explosion deals Magical Damage and slows enemies. Enemies can see the trap and attempt to avoid it, creating an interesting mind game. Blast Trap is Mortifier\'s signature ability and the foundation of his mage playstyle. The classic combo: place traps, wait, then Swap an enemy directly onto them.',
    SuperSpellMortifier: 'Last Laugh. Unlocked when Mortifier reaches Hero Power 9. After unlocking the ability, reaching Level 10 during a match grants a powerful bonus: when Mortifier dies, he automatically leaves behind a Blast Trap of his current level. Enemies can die while finishing him off, objectives become dangerous to collect, and melee heroes can accidentally trigger the trap while chasing him. This ability makes Mortifier dangerous even after death.',

    UrsaAutoattackTitle: 'Basic Attack',
    UrsaAutoattackDescription: 'Basic Attack. Grizzly\'s attacks apply a stacking debuff to the target. Each consecutive attack against the same enemy deals increased damage. The longer Grizzly remains on a target, the more dangerous he becomes. This makes him exceptionally strong against tanks, bosses, high-health heroes, and enemies forced into extended fights. If an opponent cannot escape, Grizzly\'s damage quickly becomes overwhelming.',
    UrsaPowerTitle: 'Snack Time',
    UrsaPowerDescription: 'Active Ability. Grizzly temporarily gains a large amount of bonus Health. This ability dramatically increases his survivability and allows him to stay in fights much longer than most heroes. Can be used before engaging, during combat, or as an emergency survival tool. Many Grizzly players activate it when their Health becomes low, making enemies believe they are about to secure a kill before suddenly facing a much larger Health pool.',
    UrsaBlinkTitle: 'Bear Leap',
    UrsaBlinkDescription: 'Active Ability. Grizzly instantly leaps toward a nearby target. When Bear Leap connects, the target takes damage and is slowed, while Grizzly restores Health. This ability allows Grizzly to chase fleeing enemies, initiate fights, heal during combat, and stay on top of ranged heroes. A properly timed Bear Leap often determines whether Grizzly secures a kill or allows an enemy to escape.',
    SuperSpellUrsa: 'Relentless Assault. Unlocked when Grizzly reaches Hero Power 9. After reaching Level 10 during a match, Grizzly gains a powerful enhancement to Bear Leap. Immediately after using Bear Leap, Grizzly performs an almost instant follow-up attack. Because Grizzly\'s Basic Attack damage scales with consecutive hits, this bonus attack allows him to stack his damage significantly faster, resulting in a devastating engage that can quickly overwhelm unsuspecting opponents.',

    FairyAutoattackTitle: 'Basic Attack',
    FairyAutoattackDescription: 'Basic Attack. Faerie throws magical spheres that deal magic damage to enemies. Unlike most heroes, her attacks can also heal allies — if the projectile hits a friendly target, it restores Health instead of dealing damage. With enough Attack Speed, Faerie can become a surprisingly effective healer, constantly restoring Health to frontline allies while staying at a safe distance.',
    FairyBlinkBallTitle: 'Flying Sphere',
    FairyBlinkBallDescription: 'Active Ability. Faerie transforms into a fast-moving magical sphere. While transformed, she becomes invulnerable, moves rapidly across the battlefield, and deals damage to enemies she passes through. Flying Sphere can be used to escape danger, engage fights, chase enemies, cross obstacles, or reposition during combat. Faerie can also cancel Flying Sphere early by using her Basic Attack, allowing skilled players to create unpredictable movement patterns.',
    FairySecondSpellTitle: 'Feyburst',
    FairySecondSpellDescription: 'Active Ability. Faerie releases a magical explosion around herself that damages all nearby enemies and objects. The ability has excellent synergy with Flying Sphere: fly into a group of enemies, exit Flying Sphere, instantly cast Feyburst, and reposition before enemies can react. Also extremely useful for farming bushes and clearing objectives quickly when combined with Spell Power items.',
    SuperSpellFairy: 'Enchanted Silence. Unlocked when Faerie reaches Hero Power 9. After reaching Level 10 during a match, Flying Sphere gains an additional effect. Enemies hit by Flying Sphere become Silenced for 4 seconds — they cannot cast abilities, regenerate Health, or benefit from healing effects. A well-timed Flying Sphere can completely shut down enemy carries and prevent them from escaping or recovering during critical fights.',

    VolcarnBasicAttackTitle: 'Basic Attack',
    VolcarnBasicAttackDescription: 'Basic Attack. Volcarn gains increased Attack Speed based on his missing Health. The lower his Health becomes, the faster he attacks. This creates a unique risk-versus-reward playstyle — during intense fights, Volcarn often becomes more dangerous as his Health decreases. Combined with his other abilities, this allows him to output incredible sustained damage during extended battles.',
    VolcarnPowerUpTitle: 'Demon\'s Snack Time',
    VolcarnPowerUpDescription: 'Active Ability. Demon\'s Snack Time causes Volcarn\'s attacks to cycle through special effects. Each consecutive attack applies a different bonus: Physical Armor reduction, chance to stun, and self-healing. As the ability levels up, these effects become significantly stronger. At maximum level, Volcarn can apply substantial Armor Reduction, gain a high chance to stun, and restore significant Health during combat. Once fully upgraded, every attack contributes additional utility and damage.',
    VolcarnIllusionTitle: 'Illusion',
    VolcarnIllusionDescription: 'Active Ability. Volcarn creates a portal beneath himself. While standing on the portal, Volcarn is continuously healed. If he leaves the portal before it expires, the portal transforms into an Illusion of Volcarn. The illusion inherits items, Critical Strike bonuses, armor reduction effects, Attack Speed bonuses, and most combat statistics — but deals only 50% of Volcarn\'s damage. When Volcarn becomes fully built, even 50% of his damage can be extremely threatening.',
    SuperSpellVolcarn: 'Enhanced Illusions. Unlocked when Volcarn reaches Hero Power 9. After reaching Level 10 during a match, Illusions deal 20% additional damage and copy Demon\'s Snack Time effects. Instead of simply having a second body attacking enemies, the illusion now gains access to Armor Reduction, stuns, and healing effects as well. At this stage, Volcarn becomes one of the strongest scaling heroes in Spelltroum.',

    GolemBasicAttackTitle: 'Basic Attack',
    GolemBasicAttackDescription: 'Basic Attack. Stonewarden gains bonus damage on his attacks but suffers reduced Attack Speed. He attacks slower than most heroes but each hit deals significantly more damage. Many Stonewarden players compensate with Attack Speed items, allowing him to benefit from both high damage and improved attack frequency. This makes his Basic Attack scale very well into the late game.',
    GolemWallTitle: 'Stone Wall',
    GolemWallDescription: 'Active Ability. Stonewarden creates a wall of stone directly in front of him. The wall can block enemy movement, cut off escape routes, protect allies, create chokepoints, and trap enemies. If the wall appears on top of an enemy, it deals damage immediately. Stone Walls can be destroyed by enemy attacks, but doing so often wastes valuable time and positioning. A skilled Stonewarden can completely change the flow of a fight with a well-placed wall.',
    GolemThirdSpellTitle: 'Armor Aura',
    GolemThirdSpellDescription: 'Passive Ability. Stonewarden continuously grants bonus Armor to himself and nearby allies, making his entire team significantly more durable against physical damage. At higher levels, Armor Aura gains an additional effect: 20% Damage Reflection. Whenever Stonewarden takes damage, a portion is automatically reflected back to the attacker. Attack Stonewarden and take damage yourself — or ignore him and allow him to control the fight. Either option benefits Stonewarden\'s team.',
    SuperSpellGolem: 'Stone Giant. Unlocked when Stonewarden reaches Hero Power 9. After reaching Level 10 during a match, Stonewarden gains bonus Health based on the number of bushes he destroyed throughout the game. The more bushes he farms before reaching Level 10, the larger the Health bonus becomes. A Stonewarden who has spent the match farming efficiently can receive a substantial survivability increase in the late game.',
};

const abilityTypeStyles: Record<string, { label: string; color: string }> = {
  basic: { label: 'Basic Attack', color: '#9ca3af' },
  active: { label: 'Active', color: '#FFD43A' },
  passive: { label: 'Passive', color: '#4ade80' },
  super: { label: 'Super Spell', color: '#e879f9' },
};

export default async function HeroPage({ params }: HeroPageProps) {
  const { lang, hero: heroSlug } = await params;
  if (!isValidLocale(lang)) notFound();

  const hero = getHeroById(heroSlug);
  if (!hero) notFound();

  const t = await getTranslations(lang as Locale);
  const content = await getHeroContent(hero.id, lang as Locale);
  // Ability translations: use content file if available, fallback to hardcoded en
  const ab = { ...heroAbilityTranslations, ...content.abilities };

  const rarityColor = rarityColors[hero.rarity];

  const overview = content.overview ?? hero.overview;
  const playstyle = content.playstyle ?? hero.playstyle;
  const playstyleHighlights = content.playstyleHighlights ?? hero.playstyleHighlights;
  const strengths = content.strengths ?? hero.strengths;
  const weaknesses = content.weaknesses ?? hero.weaknesses;
  const tips = content.tips ?? hero.tips;
  const recommendedBuilds = content.recommendedBuilds ?? hero.recommendedBuilds;
  const faq = content.faq ?? hero.faq;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${hero.name} — Spelltroum Hero Guide`,
    description: overview?.slice(0, 160) ?? `Guide for ${hero.name} in Spelltroum.`,
    author: { '@type': 'Organization', name: 'Spelltroum' },
    publisher: { '@type': 'Organization', name: 'Spelltroum' },
    ...(faq && faq.length > 0
      ? {
          mainEntity: faq.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen px-4 sm:px-6 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href={`/${lang}/wiki`} className="hover:text-white/70 transition-colors">Wiki</Link>
            <span>/</span>
            <Link href={`/${lang}/wiki/heroes`} className="hover:text-white/70 transition-colors">{t.heroes.title}</Link>
            <span>/</span>
            <span className="text-white/70">{hero.name}</span>
          </div>

          {/* Hero header */}
          <div
            className="relative rounded-3xl overflow-hidden mb-8 p-8 flex flex-col sm:flex-row items-center gap-8 border border-white/10"
            style={{ background: `linear-gradient(135deg, ${hero.color}22 0%, black 60%)` }}
          >
            <div
              className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: hero.color }}
            />
            <div className="relative shrink-0">
              <div
                className="w-36 h-36 rounded-full flex items-center justify-center overflow-hidden"
                style={{
                  background: `radial-gradient(circle at 40% 35%, ${hero.color}66, ${hero.color}22)`,
                  border: `3px solid ${hero.color}66`,
                  boxShadow: `0 0 40px ${hero.color}44`,
                }}
              >
                {hero.avatar ? (
                  <Image
                    src={hero.avatar}
                    alt={hero.name}
                    width={144}
                    height={144}
                    className="object-cover w-full h-full scale-110"
                  />
                ) : (
                  <span className="text-5xl font-bold" style={{ color: hero.color }}>
                    {hero.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>
            <div className="relative z-10 text-center sm:text-left">
              <h1
                className="font-lilita text-5xl sm:text-6xl mb-3 drop-shadow-lg"
                style={{ color: hero.color }}
              >
                {hero.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <span
                  className="px-3 py-1 rounded-full text-sm font-semibold border"
                  style={{ background: `${rarityColor}22`, color: rarityColor, borderColor: `${rarityColor}44` }}
                >
                  {t.heroes[`rarity${hero.rarity.charAt(0).toUpperCase() + hero.rarity.slice(1)}` as keyof typeof t.heroes] ?? rarityLabels[hero.rarity]}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/70 border border-white/10">
                  {t.heroes[`role${hero.role.charAt(0).toUpperCase() + hero.role.slice(1)}` as keyof typeof t.heroes] ?? roleLabels[hero.role]}
                </span>
              </div>
            </div>
          </div>

          {/* Detail Image */}
          {hero.detailImage && (
            <div className="mb-10 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={`/hero-detail/${hero.detailImage}`}
                alt={`${hero.name} in Spelltroum`}
                width={1600}
                height={740}
                className="w-full object-cover"
                priority
              />
            </div>
          )}

          {/* Overview */}
          {overview && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-3">{t.heroes.overview}</h2>
              <p className="text-white/65 leading-relaxed">{overview}</p>
            </section>
          )}

          {/* Playstyle */}
          {playstyle && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-3">{t.heroes.playstyle}</h2>
              <p className="text-white/65 leading-relaxed mb-3">{playstyle}</p>
              {playstyleHighlights && playstyleHighlights.length > 0 && (
                <ul className="flex flex-col gap-1.5 pl-1">
                  {playstyleHighlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/65 text-sm">
                      <span style={{ color: hero.color }}>•</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}

          {/* Abilities */}
          <section className="mb-8">
            <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.abilities}</h2>
            <div className="flex flex-col gap-3">
              {hero.abilities.map((ability) => {
                const typeStyle = abilityTypeStyles[ability.type];
                const title = ab[ability.titleKey] ?? ability.titleKey;
                const desc = ab[ability.descKey] ?? ability.descKey;
                return (
                  <div
                    key={ability.key}
                    className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 flex gap-4 items-start"
                  >
                    <div
                      className="shrink-0 w-12 h-12 rounded-xl overflow-hidden mt-0.5"
                      style={{ background: `${typeStyle.color}22`, border: `1px solid ${typeStyle.color}44` }}
                    >
                      {ability.image ? (
                        <Image src={`/spells/${ability.image}`} alt={title} width={48} height={48} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold" style={{ color: typeStyle.color }}>
                          {ability.type === 'basic' ? '⚔' : ability.type === 'passive' ? '◆' : '✦'}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="font-semibold text-white text-base">{title}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: `${typeStyle.color}22`, color: typeStyle.color }}
                        >
                          {typeStyle.label}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Super Spell */}
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.superSpell}</h2>
            <div
              className="rounded-2xl border p-5 flex gap-4 items-start"
              style={{ borderColor: '#e879f944', background: '#e879f911' }}
            >
              <div
                className="shrink-0 w-12 h-12 rounded-xl overflow-hidden"
                style={{ background: '#e879f922', border: '1px solid #e879f944' }}
              >
                {hero.superSpellImage && hero.superSpellImage !== 'Null.png' ? (
                  <Image src={`/spells/${hero.superSpellImage}`} alt="Super Spell" width={48} height={48} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl" style={{ color: '#e879f9' }}>★</div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-[#e879f9] mb-1">{t.heroes.superSpell}</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {ab[hero.superSpellKey] ?? hero.superSpellKey}
                </p>
              </div>
            </div>
          </section>

          {/* Unlocks Legendary Item */}
          {hero.unlocksItem && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.unlocksLegendaryItem}</h2>
              <Link
                href={`/${lang}/wiki/items/${hero.unlocksItem.id}`}
                className="flex items-center gap-5 p-5 rounded-2xl bg-[#d97706]/5 border border-[#d97706]/25 hover:bg-[#d97706]/10 transition-colors group max-w-md"
              >
                <div className="shrink-0">
                  <ItemIcon image={hero.unlocksItem.image} frame="legendary" level={1} size={72} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#d97706]/70 text-xs font-semibold uppercase tracking-wide mb-1">{t.heroes.legendaryItem}</div>
                  <div className="font-lilita text-xl text-[#d97706]">{hero.unlocksItem.name}</div>
                  <div className="text-white/50 text-sm mt-1">{t.heroes.unlockedByUpgrading.replace('{name}', hero.name)}</div>
                </div>
                <span className="text-white/20 group-hover:text-[#d97706]/60 text-lg transition-colors">→</span>
              </Link>
            </section>
          )}

          {/* Strengths & Weaknesses */}
          {(strengths || weaknesses) && (
            <section className="mb-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {strengths && (
                  <div className="rounded-2xl border border-[#4ade80]/20 bg-[#4ade80]/5 p-5">
                    <h2 className="font-lilita text-xl text-[#4ade80] mb-3">{t.heroes.strengths}</h2>
                    <ul className="flex flex-col gap-1.5">
                      {strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/65 text-sm">
                          <span className="text-[#4ade80] mt-0.5 shrink-0">+</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {weaknesses && (
                  <div className="rounded-2xl border border-[#f87171]/20 bg-[#f87171]/5 p-5">
                    <h2 className="font-lilita text-xl text-[#f87171] mb-3">{t.heroes.weaknesses}</h2>
                    <ul className="flex flex-col gap-1.5">
                      {weaknesses.map((w, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/65 text-sm">
                          <span className="text-[#f87171] mt-0.5 shrink-0">−</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Recommended Builds */}
          {recommendedBuilds && recommendedBuilds.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.recommendedBuilds}</h2>
              <div className="flex flex-col gap-3">
                {recommendedBuilds.map((build, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-black/40 p-5">
                    <h3 className="font-semibold mb-1" style={{ color: hero.color }}>{build.name}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{build.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Synergies */}
          {hero.synergies && hero.synergies.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.strongSynergies}</h2>
              <div className="flex flex-col gap-3">
                {hero.synergies.map((syn) => {
                  const synHero = heroes.find((h) => h.id === syn.heroId);
                  const synDesc = content.synergies?.[syn.heroId] ?? syn.description;
                  return (
                    <Link
                      key={syn.heroId}
                      href={`/${lang}/wiki/heroes/${syn.heroId}`}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                    >
                      <div
                        className="shrink-0 w-12 h-12 rounded-full overflow-hidden"
                        style={{
                          background: synHero ? `radial-gradient(circle, ${synHero.color}44, ${synHero.color}11)` : '#ffffff11',
                          border: synHero ? `2px solid ${synHero.color}55` : '2px solid #ffffff22',
                        }}
                      >
                        {synHero?.avatar ? (
                          <Image src={synHero.avatar} alt={syn.heroName} width={48} height={48} className="object-cover w-full h-full scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white/40">{syn.heroName.charAt(0)}</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm mb-0.5 group-hover:brightness-125 transition-all" style={{ color: synHero?.color ?? '#FFD43A' }}>
                          {syn.heroName}
                        </div>
                        <div className="text-white/50 text-sm leading-relaxed">{synDesc}</div>
                      </div>
                      <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg">→</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Difficult Matchups */}
          {hero.counters && hero.counters.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.difficultMatchups}</h2>
              <div className="flex flex-col gap-3">
                {hero.counters.map((counter) => {
                  const counterHero = heroes.find((h) => h.id === counter.heroId);
                  const counterDesc = content.counters?.[counter.heroId] ?? counter.description;
                  return (
                    <Link
                      key={counter.heroId}
                      href={`/${lang}/wiki/heroes/${counter.heroId}`}
                      className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors group"
                    >
                      <div
                        className="shrink-0 w-12 h-12 rounded-full overflow-hidden"
                        style={{
                          background: counterHero ? `radial-gradient(circle, ${counterHero.color}44, ${counterHero.color}11)` : '#ffffff11',
                          border: counterHero ? `2px solid ${counterHero.color}55` : '2px solid #ffffff22',
                        }}
                      >
                        {counterHero?.avatar ? (
                          <Image src={counterHero.avatar} alt={counter.heroName} width={48} height={48} className="object-cover w-full h-full scale-110" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white/40">{counter.heroName.charAt(0)}</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm mb-0.5 text-red-400 group-hover:brightness-125 transition-all">{counter.heroName}</div>
                        <div className="text-white/50 text-sm leading-relaxed">{counterDesc}</div>
                      </div>
                      <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg">→</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Tips & Tricks */}
          {tips && tips.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.tipsAndTricks}</h2>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <ul className="flex flex-col gap-2">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/65 text-sm leading-relaxed">
                      <span className="text-[#FFD43A] mt-0.5 shrink-0">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Recommended Items */}
          {(() => {
            const recommendedItems = items.filter(item =>
              item.bestHeroes.some(h => h.heroId === hero.id)
            );
            if (recommendedItems.length === 0) return null;
            return (
              <section className="mb-10">
                <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.recommendedItems}</h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {recommendedItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/${lang}/wiki/items/${item.id}`}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group text-center"
                    >
                      <ItemIcon image={item.image} frame={item.frame} level={1} size={56} />
                      <span className="text-xs font-semibold text-white/70 group-hover:text-white leading-tight">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* FAQ */}
          {faq && faq.length > 0 && (
            <section className="mb-10">
              <h2 className="font-lilita text-2xl text-white mb-4">{t.heroes.faq}</h2>
              <div className="flex flex-col gap-3">
                {faq.map((item, i) => (
                  <div key={i} className="rounded-2xl bg-black/40 border border-white/10 p-5">
                    <p className="text-white font-semibold text-sm mb-2">{item.q}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Other heroes */}
          <div>
            <h2 className="font-lilita text-xl text-white/50 mb-4">{t.heroes.otherHeroes}</h2>
            <div className="flex flex-wrap gap-2">
              {heroes
                .filter((h) => h.id !== hero.id)
                .map((h) => (
                  <Link
                    key={h.id}
                    href={`/${lang}/wiki/heroes/${h.id}`}
                    className="px-3 py-1.5 rounded-lg text-sm border border-white/10 bg-black/30 hover:bg-white/10 transition-colors"
                    style={{ color: h.color }}
                  >
                    {h.name}
                  </Link>
                ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
