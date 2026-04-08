import { c as createComponent } from './astro-component_J4ViFM41.mjs';
import { ay as generateCspDigest, b9 as unescapeHTML, T as renderTemplate, C as maybeRenderHead, a4 as addAttribute, bc as renderHead, bd as renderSlot } from './sequence_BbkuQ6gj.mjs';
import { s as spreadAttributes, r as renderComponent } from './server_jhl4VimB.mjs';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';

function createSvgComponent({ meta, attributes, children, styles }) {
  const hasStyles = styles.length > 0;
  const Component = createComponent({
    async factory(result, props) {
      const normalizedProps = normalizeProps(attributes, props);
      if (hasStyles && result.cspDestination) {
        for (const style of styles) {
          const hash = await generateCspDigest(style, result.cspAlgorithm);
          result._metadata.extraStyleHashes.push(hash);
        }
      }
      return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
    },
    propagation: hasStyles ? "self" : "none"
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const $$SocialIcons = createComponent(($$result, $$props, $$slots) => {
  const socials = [
    { icon: "/images/tg.svg", alt: "Telegram" },
    { icon: "/images/vk.svg", alt: "VK" },
    { icon: "/images/msg.svg", alt: "Messenger" }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="social-icons" data-astro-cid-f2lyqwbc> ${socials.map((social) => renderTemplate`<img${addAttribute(social.icon, "src")}${addAttribute(social.alt, "alt")} class="social-icons__item" data-astro-cid-f2lyqwbc>`)} </div>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/footer/components/SocialIcons.astro", void 0);

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const $$Contacts = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col justify-start"> <div${addAttribute(cn(
    "flex flex-col text-white-text gap-[2px] min-[1150px]:gap-[6px]",
    "text-[16px] leading-[20px]",
    "min-[767px]:text-[20px] min-[767px]:leading-[24px]",
    "min-[1150px]:text-[24px] min-[1150px]:leading-[35px]"
  ), "class")}> <div>Контактный центр</div> <div class="grid grid-cols-2 min-[767px]:grid-cols-1 max-[400px]:text-[14px]"> <div> <a href="tel:+78009000000" class="text-link">8 (800) 900 00 00</a> </div> <div> <a href="tel:+74958016200" class="text-link">+7 (495) 801 62 00</a> </div> </div> </div> <div${addAttribute(cn(
    "mt-[18px] text-[#9598A7] font-light",
    "text-[14px]",
    "min-[767px]:text-[16px]",
    "min-[1150px]:text-[18px]"
  ), "class")}>
Пн–Пт, 10:00–19:00 (МСК)
</div> <div class="mt-[34px] min-[1150px]:mt-[68px]"> ${renderComponent($$result, "SocialIcons", $$SocialIcons, {})} </div> </div>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/footer/Contacts.astro", void 0);

const Icon1 = createSvgComponent({"meta":{"src":"/_astro/icon1.DWhW0pZd.svg","width":140,"height":71,"format":"svg"},"attributes":{"width":"140","height":"71","viewBox":"0 0 140 71","fill":"none"},"children":"\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M97.0405 17.4976L104.985 9.5332L112.929 17.4976L104.985 25.4418L97.0405 17.4976ZM122.482 27.0508L130.426 34.9951L122.482 42.9393L114.538 34.9951L122.482 27.0508ZM97.0405 52.4925L104.985 60.4368L112.929 52.4925L104.985 44.5483L97.0405 52.4925ZM87.4872 27.0508L79.543 34.9951L87.4872 42.9393L95.4315 34.9951L87.4872 27.0508Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M136.019 13.5153L140.001 17.4975L130.448 27.0507L126.465 23.0685L122.483 27.0507L112.93 17.4975L116.912 13.5153L112.93 9.53311L122.483 0L126.465 3.98219L130.448 0L140.001 9.55322L136.019 13.5354V13.5153ZM95.4527 34.995L105.006 44.5482L114.559 34.995L105.006 25.4417L95.4527 34.995ZM93.0593 56.4746L97.0415 60.4568L87.4883 70.0101L83.5061 66.0279L79.5239 70.0101L69.9707 60.4568L73.9529 56.4746L69.9707 52.4925L79.5239 42.9392L83.5061 46.9214L87.4883 42.9392L97.0415 52.4925L93.0593 56.4746ZM93.0593 13.5153L97.0415 17.4975L87.4883 27.0507L83.5061 23.0685L79.5239 27.0507L69.9707 17.4975L73.9529 13.5153L69.9707 9.53311L79.544 0L83.5262 3.98219L87.4883 0L97.0415 9.55322L93.0593 13.5354V13.5153ZM136.019 56.4746L140.001 60.4568L130.448 70.0101L126.465 66.0279L122.483 70.0101L112.93 60.4568L116.912 56.4746L112.93 52.4925L122.483 42.9392L126.465 46.9214L130.448 42.9392L140.001 52.4925L136.019 56.4746Z\" fill=\"url(#paint0_linear_532_2794)\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.55322 0H0V9.55323L18.8852 28.4384H28.4183V18.8852L9.55322 0Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M60.4549 69.9902H70.0082V60.437L51.123 41.5518H41.5898V51.105L60.4751 69.9902H60.4549Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 60.4569V70.0101H9.55323L28.4384 51.1249V41.5918H18.8852L0 60.4569Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M69.9912 9.55322V0H60.438L41.5527 18.8852V28.4183H51.106L69.9912 9.53311V9.55322Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M27.0507 62.0457L35.0151 70.0101L42.9795 62.0457L35.0151 54.0813L27.0507 62.0457ZM62.0457 42.9593L69.9899 34.995L62.0457 27.0306L54.0813 34.995L62.0457 42.9593ZM7.96437 42.9593L15.9287 34.995L7.96437 27.0306L0 34.995L7.96437 42.9593ZM34.995 40.9481L40.928 35.0151L34.995 29.082L29.0619 35.0151L34.995 40.9481ZM27.0507 7.94426L35.0151 15.9086L42.9795 7.94426L35.0151 0L27.0507 7.94426Z\" fill=\"url(#paint1_linear_532_2794)\" />\n<path d=\"M29.0586 34.9931L22.4883 28.4229L15.918 34.9931L22.4883 41.5634L29.0586 34.9931Z\" fill=\"url(#paint2_linear_532_2794)\" />\n<path d=\"M54.0703 34.9863L47.5 28.416L40.9297 34.9863L47.5 41.5566L54.0703 34.9863Z\" fill=\"url(#paint3_linear_532_2794)\" />\n<path d=\"M34.9961 29.0517L41.5664 22.4814L34.9961 15.9112L28.4259 22.4814L34.9961 29.0517Z\" fill=\"url(#paint4_linear_532_2794)\" />\n<path d=\"M35.0039 54.0781L41.5742 47.5078L35.0039 40.9375L28.4337 47.5078L35.0039 54.0781Z\" fill=\"url(#paint5_linear_532_2794)\" />\n<defs>\n<linearGradient id=\"paint0_linear_532_2794\" x1=\"77.4926\" y1=\"7.48168\" x2=\"134.47\" y2=\"64.4792\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n<linearGradient id=\"paint1_linear_532_2794\" x1=\"12.9723\" y1=\"12.9723\" x2=\"60.135\" y2=\"60.135\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n<linearGradient id=\"paint2_linear_532_2794\" x1=\"6.72172\" y1=\"19.2215\" x2=\"53.8845\" y2=\"66.4043\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n<linearGradient id=\"paint3_linear_532_2794\" x1=\"19.2277\" y1=\"6.71914\" x2=\"66.4106\" y2=\"53.8819\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n<linearGradient id=\"paint4_linear_532_2794\" x1=\"19.2245\" y1=\"6.71489\" x2=\"66.4073\" y2=\"53.8776\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n<linearGradient id=\"paint5_linear_532_2794\" x1=\"6.72258\" y1=\"19.2213\" x2=\"53.8854\" y2=\"66.4042\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n</defs>\n","styles":[]});

const Icon2 = createSvgComponent({"meta":{"src":"/_astro/icon2.DOItd7ry.svg","width":140,"height":46,"format":"svg"},"attributes":{"width":"140","height":"46","viewBox":"0 0 140 46","fill":"none"},"children":"\n<path d=\"M0 10.2769V0.180664H7.3409V2.05109H2.01121V8.38638H7.40124V10.2568H0V10.2769ZM0.78437 6.0936V4.24329H6.55653V6.0936H0.78437Z\" fill=\"#EBEBEB\" />\n<path d=\"M9.19141 10.2769V0.180664H13.8574C14.501 0.180664 15.0842 0.301333 15.5669 0.522565C16.0496 0.743798 16.4317 1.04548 16.6932 1.44772C16.9547 1.82985 17.0954 2.29243 17.0954 2.79523C17.0954 3.29803 16.9748 3.74049 16.7133 4.10251C16.4519 4.46453 16.11 4.72598 15.6675 4.90699V4.98744C16.2105 5.12823 16.6329 5.40979 16.9547 5.83215C17.2765 6.2545 17.4373 6.7573 17.4373 7.36067C17.4373 7.96403 17.2966 8.46683 16.9949 8.88918C16.6932 9.33164 16.2708 9.67355 15.7278 9.9149C15.1647 10.1562 14.5211 10.2769 13.7367 10.2769H9.21152H9.19141ZM13.6161 8.56739C13.9781 8.56739 14.2798 8.50705 14.5412 8.40649C14.8027 8.30593 14.9837 8.14503 15.1245 7.94391C15.2652 7.74279 15.3256 7.50145 15.3256 7.19977C15.3256 6.89809 15.2652 6.65674 15.1245 6.45562C14.9837 6.2545 14.8027 6.11371 14.5412 6.01315C14.2999 5.91259 13.9781 5.87237 13.5959 5.87237H10.4585V4.30363H13.5959C14.0384 4.30363 14.3803 4.20307 14.6217 3.98184C14.863 3.76061 14.9837 3.47903 14.9837 3.09691C14.9837 2.85556 14.9233 2.63433 14.8228 2.45332C14.7222 2.27231 14.5613 2.13153 14.3401 2.05109C14.1189 1.95053 13.8775 1.91029 13.5959 1.91029H11.1222V8.56739H13.5758H13.6161Z\" fill=\"#EBEBEB\" />\n<path d=\"M19.168 10.2769V0.180664H23.2105C23.9949 0.180664 24.6787 0.321443 25.2619 0.623124C25.8452 0.924805 26.3077 1.32705 26.6295 1.84996C26.9513 2.37287 27.1122 2.97624 27.1122 3.66005C27.1122 4.34386 26.9513 4.94722 26.6295 5.47013C26.3077 5.99304 25.8452 6.4154 25.2619 6.69696C24.6787 6.97853 23.9949 7.13943 23.2105 7.13943H20.1132V5.28912H23.1502C23.5524 5.28912 23.8943 5.22878 24.1759 5.10811C24.4574 4.98744 24.6787 4.80643 24.8195 4.54498C24.9602 4.28352 25.0407 4.00195 25.0407 3.66005C25.0407 3.13713 24.8798 2.73489 24.558 2.45332C24.2362 2.17175 23.7535 2.03097 23.1502 2.03097H21.1591V6.2545L21.1792 10.2769H19.168Z\" fill=\"#EBEBEB\" />\n<path d=\"M27.1699 10.2769L30.0459 0.180664H34.189L37.0651 10.2769H35.0136L32.7208 2.03097H31.4739L29.2012 10.2769H27.1699ZM28.98 7.9238L29.523 6.0735H34.7321L35.2751 7.9238H28.98Z\" fill=\"#EBEBEB\" />\n<path d=\"M41.8741 10.4784C41.0093 10.4784 40.2651 10.3376 39.6416 10.0761C38.9981 9.81468 38.4953 9.43255 38.1332 8.92975C37.7712 8.42695 37.55 7.8437 37.5098 7.18H39.6215C39.6618 7.66269 39.883 8.04482 40.2651 8.28616C40.6472 8.52751 41.1702 8.64818 41.8741 8.64818C42.2964 8.64818 42.6383 8.58784 42.94 8.48728C43.2417 8.38672 43.4428 8.22583 43.6037 8.0247C43.7445 7.82358 43.8249 7.58224 43.8249 7.30067C43.8249 7.0191 43.7646 6.77776 43.6238 6.57664C43.483 6.37552 43.2819 6.23473 43.0004 6.13417C42.7188 6.03361 42.397 5.97327 41.9948 5.97327H40.6674V4.26375H41.9948C42.2964 4.26375 42.578 4.20341 42.8193 4.10285C43.0607 4.00229 43.2417 3.86151 43.3825 3.6805C43.5032 3.49949 43.5836 3.27826 43.5836 3.01681C43.5836 2.63468 43.4428 2.33299 43.1411 2.13187C42.8395 1.93075 42.397 1.8302 41.7936 1.8302C41.1903 1.8302 40.7679 1.93075 40.4662 2.13187C40.1646 2.33299 39.9835 2.65479 39.9433 3.07714H37.8316C37.8919 2.11176 38.2941 1.36762 38.9981 0.824594C39.702 0.281568 40.6472 0 41.8339 0C42.5981 0 43.2819 0.120673 43.8451 0.362018C44.4283 0.603362 44.8708 0.925151 45.1725 1.3475C45.4741 1.76986 45.635 2.25255 45.635 2.79557C45.635 3.3386 45.4943 3.76095 45.2328 4.12297C44.9713 4.48499 44.5691 4.76655 44.0462 4.94756V5.02801C44.6294 5.18891 45.092 5.49059 45.4138 5.91294C45.7356 6.33529 45.9166 6.85821 45.9166 7.46157C45.9166 8.06493 45.7557 8.56773 45.4339 9.0102C45.1121 9.45266 44.6495 9.81468 44.0462 10.056C43.4428 10.2974 42.7389 10.4382 41.9143 10.4382L41.8741 10.4784Z\" fill=\"#EBEBEB\" />\n<path d=\"M47.7252 10.2769V0.180664H49.7364V8.10481H50.1386L53.4571 0.180664H56.8561V10.2769H54.8449V2.35276H54.4225L51.0839 10.2769H47.7051H47.7252Z\" fill=\"#EBEBEB\" />\n<path d=\"M58.4453 10.2767L61.4621 5.91242H63.6141L60.718 10.2767H58.4453ZM64.8409 10.2767V5.69118L64.8611 2.01068H62.6487C62.2666 2.01068 61.9448 2.07102 61.6632 2.19169C61.4018 2.31236 61.1806 2.47326 61.0599 2.7146C60.9191 2.93583 60.8588 3.2174 60.8588 3.53919C60.8588 4.042 61.0197 4.42412 61.3213 4.68558C61.623 4.94704 62.0856 5.06772 62.6688 5.06772H66.0477V6.85769H62.7091C61.9247 6.85769 61.2409 6.7169 60.6576 6.43533C60.0744 6.15376 59.6118 5.77163 59.29 5.26883C58.9682 4.76603 58.8073 4.18278 58.8073 3.53919C58.8073 2.89561 58.9682 2.31236 59.29 1.80956C59.6118 1.30676 60.0543 0.904519 60.6375 0.643062C61.2208 0.361493 61.8644 0.220703 62.6085 0.220703H66.8924V10.317H64.8812L64.8409 10.2767Z\" fill=\"#EBEBEB\" />\n<path d=\"M0 27.5738V17.4775H3.62017L5.77216 23.491H6.1744L8.32639 17.4775H11.8661V27.5738H9.87502V19.4485H9.43255L7.3409 25.281H4.52521L2.43356 19.4485H2.01121V27.5738H0Z\" fill=\"#EBEBEB\" />\n<path d=\"M14.1602 27.5738V17.4775H21.5011V19.348H16.1915V25.6833H21.5815V27.5537H14.1803L14.1602 27.5738ZM14.9445 23.3905V21.5402H20.7167V23.3905H14.9445Z\" fill=\"#EBEBEB\" />\n<path d=\"M22.3242 27.5738L26.0248 21.8016V22.8475L22.6058 17.4775H24.8181L27.8751 22.3849L24.5969 27.5537H22.3242V27.5738ZM26.6483 23.4106L26.6885 21.5402H32.521V23.4106H26.6483ZM28.6193 27.5738V17.4775H30.5903V27.5738H28.6193ZM34.5725 27.5738L31.3143 22.405L34.3914 17.4976H36.5837L33.1445 22.8676L33.2249 21.8419L36.8853 27.5939H34.5725V27.5738Z\" fill=\"#EBEBEB\" />\n<path d=\"M37.209 29.6252V25.7034H48.1499V29.6252H46.2192V27.5738H39.1397V29.6252H37.209ZM38.1341 26.347L40.5878 17.4775H44.751L47.2047 26.347H45.1532L43.2828 19.3278H42.0359L40.1252 26.347H38.1341Z\" fill=\"#EBEBEB\" />\n<path d=\"M50.2204 24.0341L47.5254 17.4976H49.6975L51.5679 22.2441H53.9411L53.197 24.0542H50.2204V24.0341ZM50.7031 27.5738L54.6853 17.4775H56.7769L52.7947 27.5738H50.7031Z\" fill=\"#EBEBEB\" />\n<path d=\"M57.8848 27.5738V17.4775H59.896V27.5738H57.8848ZM58.9507 23.4508V21.5402H65.286V23.4508H58.9507ZM64.4413 27.5738V17.4775H66.4525V27.5738H64.4413Z\" fill=\"#EBEBEB\" />\n<path d=\"M67.8184 27.5738L70.6944 17.4775H74.8375L77.7135 27.5738H75.6621L73.3693 19.3278H72.1223L69.8497 27.5738H67.8184ZM69.6284 25.2207L70.1715 23.3704H75.3805L75.9235 25.2207H69.6284Z\" fill=\"#EBEBEB\" />\n<path d=\"M79.1016 27.5738V17.4775H83.1441C83.9285 17.4775 84.6123 17.6183 85.1955 17.92C85.7788 18.2217 86.2413 18.6239 86.5631 19.1468C86.8849 19.6698 87.0458 20.2731 87.0458 20.9569C87.0458 21.6407 86.8849 22.2441 86.5631 22.767C86.2413 23.2899 85.7788 23.7123 85.1955 23.9938C84.6123 24.2754 83.9285 24.4363 83.1441 24.4363H80.0468V22.586H83.0837C83.486 22.586 83.8279 22.5257 84.1095 22.405C84.391 22.2843 84.6123 22.1033 84.753 21.8419C84.8938 21.5804 84.9743 21.2988 84.9743 20.9569C84.9743 20.434 84.8134 20.0318 84.4916 19.7502C84.1698 19.4686 83.6871 19.3278 83.0837 19.3278H81.0927V23.5514L81.1128 27.5738H79.1016Z\" fill=\"#EBEBEB\" />\n<path d=\"M93.4201 27.7743C92.4145 27.7743 91.5095 27.553 90.705 27.0905C89.8804 26.6279 89.2569 26.0044 88.7742 25.1999C88.3117 24.3955 88.0703 23.5105 88.0703 22.525C88.0703 21.5395 88.3117 20.6546 88.7742 19.8501C89.2368 19.0456 89.8804 18.4222 90.705 17.9797C91.5296 17.5171 92.4346 17.2959 93.4201 17.2959C94.4056 17.2959 95.3308 17.5171 96.1554 17.9797C96.98 18.4423 97.6034 19.0658 98.0861 19.8501C98.5487 20.6546 98.79 21.5395 98.79 22.525C98.79 23.5105 98.5487 24.3955 98.0861 25.1999C97.6235 26.0044 96.98 26.6279 96.1554 27.0905C95.3308 27.553 94.4257 27.7743 93.4201 27.7743ZM93.4201 25.8636C94.0637 25.8636 94.6268 25.7228 95.1095 25.4413C95.5922 25.1597 95.9945 24.7575 96.2559 24.2547C96.5174 23.7519 96.6582 23.1686 96.6582 22.525C96.6582 21.8814 96.5174 21.2982 96.2559 20.7954C95.9945 20.2926 95.5922 19.8904 95.1095 19.6088C94.6067 19.3272 94.0436 19.1864 93.4201 19.1864C92.7966 19.1864 92.2335 19.3272 91.7307 19.6088C91.2279 19.8904 90.8458 20.2926 90.5642 20.7954C90.2826 21.2982 90.162 21.8814 90.162 22.525C90.162 23.1686 90.3028 23.7519 90.5642 24.2547C90.8257 24.7575 91.2279 25.1597 91.7307 25.4413C92.2335 25.7228 92.7966 25.8636 93.4201 25.8636Z\" fill=\"#EBEBEB\" />\n<path d=\"M99.0137 29.6252V25.7034H109.955V29.6252H108.024V27.5738H100.944V29.6252H99.0137ZM99.9589 26.347L102.413 17.4775H106.576L109.029 26.347H106.978L105.108 19.3278H103.861L101.95 26.347H99.9589Z\" fill=\"#EBEBEB\" />\n<path d=\"M111.318 27.5738V17.4775H113.33V27.5738H111.318ZM112.384 23.4508V21.5402H118.72V23.4508H112.384ZM117.855 27.5738V17.4775H119.866V27.5738H117.855Z\" fill=\"#EBEBEB\" />\n<path d=\"M121.236 27.5738L124.112 17.4775H128.255L131.131 27.5738H129.08L126.787 19.3278H125.54L123.268 27.5738H121.236ZM123.046 25.2207L123.589 23.3704H128.798L129.341 25.2207H123.046Z\" fill=\"#EBEBEB\" />\n<path d=\"M131.514 27.5736L134.53 23.2093H136.682L133.786 27.5736H131.514ZM137.889 27.5736V22.9881L137.909 19.3075H135.697C135.315 19.3075 134.993 19.3679 134.711 19.4886C134.45 19.6092 134.229 19.7701 134.108 20.0115C133.967 20.2327 133.907 20.5143 133.907 20.8361C133.907 21.3389 134.068 21.721 134.37 21.9825C134.671 22.2439 135.134 22.3646 135.717 22.3646H139.096V24.1546H135.757C134.973 24.1546 134.289 24.0138 133.706 23.7322C133.123 23.4506 132.66 23.0685 132.338 22.5657C132.016 22.0629 131.856 21.4796 131.856 20.8361C131.856 20.1925 132.016 19.6092 132.338 19.1064C132.66 18.6036 133.103 18.2014 133.686 17.9399C134.269 17.6584 134.913 17.5176 135.657 17.5176H139.941V27.6138H137.929L137.889 27.5736Z\" fill=\"#EBEBEB\" />\n<path d=\"M0 44.8697V34.7734H8.48729V44.8697H6.47608V36.7042H2.01121V44.8697H0Z\" fill=\"#EBEBEB\" />\n<path d=\"M10.8008 44.8697V34.7734H14.8433C15.6277 34.7734 16.3115 34.9142 16.8947 35.2159C17.478 35.5176 17.9406 35.9198 18.2624 36.4427C18.5841 36.9657 18.745 37.569 18.745 38.2528C18.745 38.9366 18.5841 39.54 18.2624 40.0629C17.9406 40.5858 17.478 41.0082 16.8947 41.2897C16.3115 41.5713 15.6277 41.7322 14.8433 41.7322H11.746V39.8819H14.783C15.1852 39.8819 15.5271 39.8216 15.8087 39.7009C16.0903 39.5802 16.3115 39.3992 16.4523 39.1378C16.5931 38.8763 16.6735 38.5947 16.6735 38.2528C16.6735 37.7299 16.5126 37.3277 16.1908 37.0461C15.869 36.7645 15.3863 36.6238 14.783 36.6238H12.7919V40.8473L12.812 44.8697H10.8008Z\" fill=\"#EBEBEB\" />\n<path d=\"M20.3125 44.8697V34.7734H27.6534V36.6439H22.3438V42.9792H27.7338V44.8496H20.3326L20.3125 44.8697ZM21.0768 40.6864V38.8361H26.8489V40.6864H21.0768Z\" fill=\"#EBEBEB\" />\n<path d=\"M29.4863 44.8697V34.7734H33.1065L35.2585 40.7869H35.6607L37.8127 34.7734H41.3524V44.8697H39.3613V36.7444H38.9189L36.8272 42.5769H34.0115L31.9199 36.7444H31.4975V44.8697H29.4863Z\" fill=\"#EBEBEB\" />\n<path d=\"M43.6627 44.8697V34.7734H45.6739V42.6976H46.0761L49.3946 34.7734H52.7936V44.8697H50.7824V36.9455H50.36L47.0214 44.8697H43.6426H43.6627Z\" fill=\"#EBEBEB\" />\n<path d=\"M54.3848 44.8705L57.4016 40.5062H59.5536L56.6574 44.8705H54.3848ZM60.7804 44.8705V40.2849L60.8005 36.6044H58.5882C58.2061 36.6044 57.8843 36.6648 57.6027 36.7854C57.3412 36.9061 57.12 37.067 56.9993 37.3084C56.8586 37.5296 56.7982 37.8112 56.7982 38.1329C56.7982 38.6357 56.9591 39.0179 57.2608 39.2793C57.5625 39.5408 58.025 39.6615 58.6083 39.6615H61.9871V41.4514H58.6485C57.8642 41.4514 57.1803 41.3106 56.5971 41.0291C56.0138 40.7475 55.5513 40.3654 55.2295 39.8626C54.9077 39.3598 54.7468 38.7765 54.7468 38.1329C54.7468 37.4894 54.9077 36.9061 55.2295 36.4033C55.5513 35.9005 55.9937 35.4983 56.577 35.2368C57.1602 34.9552 57.8038 34.8145 58.548 34.8145H62.8318V44.9107H60.8206L60.7804 44.8705Z\" fill=\"#EBEBEB\" />\n<path d=\"M67.7779 44.8704V42.4168L71.921 39.8625C72.2629 39.6413 72.5445 39.4402 72.7657 39.2391C72.9869 39.0379 73.1478 38.8368 73.2283 38.6156C73.3288 38.3943 73.3691 38.153 73.3691 37.8714C73.3691 37.4491 73.2283 37.1072 72.9467 36.8658C72.6651 36.6044 72.283 36.4837 71.8003 36.4837C71.2573 36.4837 70.8148 36.6446 70.4931 36.9463C70.1713 37.248 69.9903 37.6502 69.95 38.1329H67.8584C67.8584 37.5094 68.0193 36.9262 68.3209 36.4033C68.6226 35.8803 69.045 35.4379 69.6282 35.1161C70.2115 34.7943 70.9556 34.6133 71.8406 34.6133C72.6048 34.6133 73.2484 34.7541 73.8115 35.0155C74.3747 35.277 74.7769 35.6591 75.0786 36.1217C75.3602 36.6044 75.501 37.1474 75.501 37.7508C75.501 38.2335 75.4205 38.6759 75.2596 39.0782C75.0987 39.4804 74.8373 39.8625 74.4953 40.2044C74.1534 40.5463 73.6909 40.9084 73.1076 41.2704L70.7344 42.7386V43.0201H75.7021V44.8704H67.7578H67.7779Z\" fill=\"#C5985E\" />\n<path d=\"M81.5144 45.0714C80.6094 45.0714 79.7848 44.8501 79.0406 44.4077C78.3166 43.9652 77.7333 43.3417 77.311 42.5574C76.8886 41.773 76.6875 40.8679 76.6875 39.8623C76.6875 38.8567 76.8886 37.9517 77.311 37.1673C77.7333 36.383 78.2965 35.7595 79.0406 35.317C79.7646 34.8745 80.5892 34.6533 81.5144 34.6533C82.4395 34.6533 83.244 34.8745 83.9882 35.317C84.7122 35.7595 85.2955 36.383 85.7178 37.1673C86.1402 37.9517 86.3413 38.8567 86.3413 39.8623C86.3413 40.8679 86.1402 41.773 85.7178 42.5574C85.2955 43.3417 84.7323 43.9652 83.9882 44.4077C83.2641 44.8501 82.4395 45.0714 81.5144 45.0714ZM81.5144 43.1607C82.0373 43.1607 82.4999 43.04 82.9222 42.7786C83.3245 42.5372 83.6463 42.1551 83.8876 41.6523C84.129 41.1495 84.2496 40.5462 84.2496 39.8221C84.2496 39.0981 84.129 38.4947 83.8876 37.9919C83.6463 37.4891 83.3245 37.1271 82.9222 36.8656C82.52 36.6243 82.0574 36.4835 81.5144 36.4835C80.9714 36.4835 80.5088 36.6042 80.1066 36.8656C79.7043 37.1271 79.3825 37.4891 79.1412 37.9919C78.8998 38.4947 78.7792 39.0981 78.7792 39.8221C78.7792 40.5462 78.8998 41.1495 79.1412 41.6523C79.3825 42.1551 79.7043 42.5372 80.1066 42.7786C80.5088 43.0199 80.9915 43.1607 81.5144 43.1607Z\" fill=\"#C5985E\" />\n<path d=\"M87.3463 44.8704V42.4168L91.4894 39.8625C91.8313 39.6413 92.1128 39.4402 92.3341 39.2391C92.5553 39.0379 92.7162 38.8368 92.7966 38.6156C92.8972 38.3943 92.9374 38.153 92.9374 37.8714C92.9374 37.4491 92.7966 37.1072 92.5151 36.8658C92.2335 36.6044 91.8514 36.4837 91.3687 36.4837C90.8257 36.4837 90.3832 36.6446 90.0614 36.9463C89.7396 37.248 89.5586 37.6502 89.5184 38.1329H87.4267C87.4267 37.5094 87.5876 36.9262 87.8893 36.4033C88.191 35.8803 88.6133 35.4379 89.1966 35.1161C89.7798 34.7943 90.524 34.6133 91.4089 34.6133C92.1732 34.6133 92.8168 34.7541 93.3799 35.0155C93.943 35.277 94.3453 35.6591 94.647 36.1217C94.9285 36.6044 95.0693 37.1474 95.0693 37.7508C95.0693 38.2335 94.9889 38.6759 94.828 39.0782C94.6671 39.4804 94.4056 39.8625 94.0637 40.2044C93.7218 40.5463 93.2592 40.9084 92.676 41.2704L90.3028 42.7386V43.0201H95.2704V44.8704H87.3262H87.3463Z\" fill=\"#C5985E\" />\n<path d=\"M100.278 45.0712C99.4329 45.0712 98.6888 44.9103 98.0653 44.5885C97.4217 44.2667 96.939 43.8243 96.5971 43.2812C96.2552 42.7181 96.0742 42.1147 96.0742 41.4309C96.0742 41.0689 96.1346 40.7069 96.2552 40.3449C96.3759 39.9829 96.5167 39.6409 96.7178 39.2789C96.9189 38.9169 97.1402 38.5951 97.4016 38.2733L100.117 34.7939H102.51L99.4329 38.5951L98.6083 38.1124C98.8698 38.0119 99.1514 37.9515 99.4329 37.9113C99.7145 37.8711 99.9961 37.851 100.318 37.851C101.163 37.851 101.887 38.0119 102.53 38.3136C103.174 38.6152 103.656 39.0577 103.978 39.6007C104.32 40.1437 104.481 40.7672 104.481 41.4309C104.481 42.0946 104.32 42.7382 103.978 43.2812C103.636 43.8243 103.154 44.2667 102.51 44.5885C101.866 44.9103 101.142 45.0712 100.298 45.0712H100.278ZM100.258 43.3013C100.68 43.3013 101.042 43.2209 101.364 43.06C101.685 42.8991 101.927 42.698 102.108 42.4164C102.289 42.1348 102.369 41.8131 102.369 41.4711C102.369 41.1292 102.289 40.7873 102.108 40.5058C101.927 40.2242 101.685 40.0231 101.364 39.8622C101.042 39.7013 100.68 39.6208 100.258 39.6208C99.8352 39.6208 99.453 39.7013 99.1313 39.8622C98.8095 40.0231 98.5681 40.2443 98.4072 40.5058C98.2262 40.7873 98.1458 41.089 98.1458 41.4711C98.1458 41.8533 98.2262 42.1348 98.4072 42.4164C98.5882 42.698 98.8296 42.9192 99.1313 43.06C99.453 43.2209 99.8151 43.3013 100.258 43.3013Z\" fill=\"#C5985E\" />\n","styles":[]});

const Icon3 = createSvgComponent({"meta":{"src":"/_astro/icon3.DteqAvAO.svg","width":140,"height":71,"format":"svg"},"attributes":{"width":"140","height":"71","viewBox":"0 0 140 71","fill":"none"},"children":"\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M26.2468 35.0151L17.498 43.7638H26.2468V52.5126L34.9955 43.7638L43.7443 35.0151L52.493 26.2663H43.7443V17.5176L34.9955 26.2663L26.2468 35.0151ZM34.9955 26.2663L43.7443 35.0151L52.493 43.7638H43.7443V52.5126L34.9955 43.7638L26.2468 35.0151L17.498 26.2663H26.2468V17.5176L34.9955 26.2663Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.4975 8.76925H26.2462V17.518L34.995 8.76925L43.7437 0.0205078L52.4925 8.76925H61.2412V17.518L69.9899 26.2667L61.2412 35.0155L52.4925 43.7642H61.2412V52.513L69.9899 61.2617L61.2412 70.0104L52.4925 61.2617H43.7437V52.513L34.995 61.2617L26.2462 70.0104L17.4975 61.2617H8.74874V52.513L0 43.7642L8.74874 35.0155L17.4975 26.2667H8.74874V17.518L0 8.76925L8.74874 0.0205078L17.4975 8.76925ZM69.9899 8.76925L61.2412 0.0205078L52.4925 8.76925H43.7437V17.518L34.995 8.76925L26.2462 0.0205078L17.4975 8.76925H8.74874V17.518L0 26.2667L8.74874 35.0155L17.4975 43.7642H8.74874V52.513L0 61.2617L8.74874 70.0104L17.4975 61.2617H26.2462V52.513L34.995 61.2617L43.7437 70.0104L52.4925 61.2617H61.2412V52.513L69.9899 43.7642L61.2412 35.0155L52.4925 26.2667H61.2412V17.518L69.9899 8.76925Z\" fill=\"url(#paint0_linear_532_2785)\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M104.986 11.1421L110.557 5.57103L104.986 0L99.4147 5.57103L104.986 11.1421ZM117.717 35.0151L104.986 47.746L99.4147 53.3171L104.986 58.8881L110.557 64.4591L104.986 70.0302L99.4147 64.4591L104.986 58.8881L110.557 53.3171L104.986 47.746L92.2549 35.0151L86.6838 40.5861L81.1128 35.0151L75.5417 40.5861L69.9707 35.0151L75.5417 29.444L81.1128 35.0151L86.6838 29.444L92.2549 35.0151L104.986 22.2842L99.4147 16.7131L104.986 11.1421L110.557 16.7131L104.986 22.2842L117.717 35.0151L123.288 29.444L128.859 35.0151L134.43 40.5861L140.001 35.0151L134.43 29.444L128.859 35.0151L123.288 40.5861L117.717 35.0151Z\" fill=\"url(#paint1_linear_532_2785)\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M82.7212 70.01L99.4142 53.3171L86.6832 40.5861L69.9902 57.2992V70.0302H82.7212V70.01ZM127.249 0.0201163L110.556 16.7131L123.287 29.444L139.98 12.7309V0H127.249V0.0201163Z\" fill=\"#EBEBEB\" />\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M69.9908 12.7309L86.6838 29.4239L99.4147 16.693L82.7016 0H69.9707V12.7309H69.9908ZM139.981 57.2791L123.288 40.5861L110.557 53.3171L127.27 70.01H140.001V57.2791H139.981Z\" fill=\"#EBEBEB\" />\n<defs>\n<linearGradient id=\"paint0_linear_532_2785\" x1=\"6.1744\" y1=\"6.19491\" x2=\"65.2636\" y2=\"65.264\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n<linearGradient id=\"paint1_linear_532_2785\" x1=\"87.4079\" y1=\"17.4371\" x2=\"128.617\" y2=\"58.6266\" gradientUnits=\"userSpaceOnUse\">\n<stop stop-color=\"#EAC781\" />\n<stop offset=\"1\" stop-color=\"#A87242\" />\n</linearGradient>\n</defs>\n","styles":[]});

const $$Icons = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col justify-between" data-astro-cid-5m2jnbgj> <div class="flex flex-col justify-start" data-astro-cid-5m2jnbgj> <div class="flex flex-col gap-[10px]" data-astro-cid-5m2jnbgj> <img${addAttribute(Icon1.src, "src")} class="icon" data-astro-cid-5m2jnbgj> <img${addAttribute(Icon2.src, "src")} class="icon" data-astro-cid-5m2jnbgj> <img${addAttribute(Icon3.src, "src")} class="icon" data-astro-cid-5m2jnbgj> </div> </div> <div class="text-[#9598A7] text-[10px] font-tt-firs footer-padding hidden max-[700px]:block whitespace-nowrap" data-astro-cid-5m2jnbgj>
АНО «Евразия» ©
</div> </div>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/footer/Icons.astro", void 0);

const $$InfoColumn = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col-reverse min-[1150px]:flex-col justify-between"> <div${addAttribute(cn(
    "flex flex-col justify-start gap-[20px] min-[1150px]:gap-[30px]",
    "text-white-text text-[10px]",
    "min-[1150px]:text-[14px]"
  ), "class")}> <div class="flex flex-col gap-0"> <div>Орг. комитет:</div> <a href="mailto:org@premiyaevrazia.su"${addAttribute(cn("text-link-reverse text-[16px]", "max-[1150px]:text-[18px]", "max-[700px]:text-[14px]"), "class")}>org@premiyaevrazia.su</a> </div> <div class="flex flex-col gap-0"> <div>Тех. поддержка:</div> <a href="mailto:support@premiyaevrazia.su"${addAttribute(cn("text-link-reverse text-[16px]", "max-[1150px]:text-[18px]", "max-[700px]:text-[14px]"), "class")}>support@premiyaevrazia.su</a> </div> </div> </div>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/footer/InfoColumn.astro", void 0);

const $$MenuLinks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-row flex-wrap justify-start min-[767px]:justify-center min-[1150px]:flex-col min-[1150px]:justify-start gap-x-[36px] min-[1150px]:gap-x-[50px] gap-y-[20px] text-white-text text-[14px]"> <a href="/#nominations" class="text-link">Номинации</a> <a href="/#steps" class="text-link">Этапы</a> <!-- <a
		href={PATHS.experts.root}
		class='text-link'
		>Эксперты</a
	>
	<a
		href={PATHS.news.root}
		class='text-link'
		>Новости</a
	> --> <a href="/#docs" class="text-link">Документы</a> <!-- <a
		href={PATHS.press}
		class='text-link'
		>Для СМИ</a
	> --> </div>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/footer/MenuLinks.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<footer class="mt-[100px]! bg-dark-blue text-white-text pt-[40px]! min-[1150px]:pt-[100px]! pb-[50px]!" data-astro-cid-yfkywswv> <div class="flex flex-col w-full content footer-padding" data-astro-cid-yfkywswv> <section class="block min-[1150px]:hidden mb-[30px] min-[767px]:mb-[40px]" data-astro-cid-yfkywswv> ${renderComponent($$result, "MenuLinks", $$MenuLinks, { "data-astro-cid-yfkywswv": true })} </section> <section class="block min-[767px]:hidden mb-[40px]" data-astro-cid-yfkywswv> ${renderComponent($$result, "Contacts", $$Contacts, { "data-astro-cid-yfkywswv": true })} </section> </div> <div class="flex flex-row gap-[60px] justify-start min-[767px]:gap-0 min-[767px]:justify-between footer-padding" data-astro-cid-yfkywswv> <!-- Первая колонка --> ${renderComponent($$result, "Icons", $$Icons, { "data-astro-cid-yfkywswv": true })} <!-- Контакты --> <section class="hidden min-[767px]:block" data-astro-cid-yfkywswv> ${renderComponent($$result, "Contacts", $$Contacts, { "data-astro-cid-yfkywswv": true })} </section> <!-- Меню --> <section class="hidden min-[1150px]:block" data-astro-cid-yfkywswv> ${renderComponent($$result, "MenuLinks", $$MenuLinks, { "data-astro-cid-yfkywswv": true })} </section> <!-- Последняя колонка --> ${renderComponent($$result, "InfoColumn", $$InfoColumn, { "data-astro-cid-yfkywswv": true })} </div> <div class="text-[#9598A7] text-[12px] footer-padding max-[700px]:hidden" data-astro-cid-yfkywswv>АНО «Евразия» ©</div> </footer>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/footer/Footer.astro", void 0);

const COOKIE_NAME = "eurasia_cookie";
const COOKIE_VALUE = "accepted";
const COOKIE_MAX_AGE = 31536e4;
const EXIT_ANIMATION_MS = 300;
const COOKIE_SYNC_KEY = "eurasia_cookie_sync";
function hasCookie(name) {
  return document.cookie.split(";").map((item) => item.trim()).some((item) => item.startsWith(`${name}=`));
}
function setCookie(name, value) {
  document.cookie = `${name}=${value}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}
function broadcastCookieAccepted() {
  try {
    localStorage.setItem(COOKIE_SYNC_KEY, String(Date.now()));
  } catch {
  }
}
function CookieAlert() {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeBanner = useCallback(
    (persist = true) => {
      if (isClosing) {
        return;
      }
      if (persist) {
        setCookie(COOKIE_NAME, COOKIE_VALUE);
        broadcastCookieAccepted();
      }
      setIsClosing(true);
      setIsVisible(false);
      window.setTimeout(() => {
        setIsMounted(false);
      }, EXIT_ANIMATION_MS);
    },
    [isClosing]
  );
  useEffect(() => {
    if (hasCookie(COOKIE_NAME)) {
      return;
    }
    setIsMounted(true);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
    const onStorage = (event) => {
      if (event.key !== COOKIE_SYNC_KEY) {
        return;
      }
      if (hasCookie(COOKIE_NAME)) {
        closeBanner(false);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [closeBanner]);
  if (!isMounted) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        `fixed inset-x-0 bottom-0 z-2147483647 transition-transform duration-300 ease-out`,
        "w-full bg-accent text-white-text ",
        "px-[40px] pt-[15px] pb-[25px]",
        "text-[14px] leading-[22px]",
        { ["translate-y-0"]: isVisible },
        { ["translate-y-full"]: !isVisible },
        "flex flex-row justify-between items-center gap-[40px]",
        "max-[1200px]:flex-col max-[1200px]:gap-[10px] max-[1200px]:items-start max-[1200px]:text-[12px] max-[1200px]:leading-[18px]",
        "max-[700px]:p-[20px] max-[700px]:text-[10px] max-[700px]:leading-[14px]"
      ),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-[20px]", children: [
          /* @__PURE__ */ jsx("div", { className: "flex grow", children: 'Мы используем файлы cookie для удобства пользованием сайта и сбора статистики в метрической программе Яндекс.Метрика. Продолжая пользоваться сайтом вы соглашаетесь с "Положением об обработке персональных данных" и даете "Согласие на обработку персональных данных", собираемых метрическими программами.' }),
          /* @__PURE__ */ jsx("div", { className: "hidden min-[700px]:flex min-[1200px]:hidden justify-start items-end flex-col relative -top-[4px] -right-[6px]", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Закрыть баннер cookie",
              onClick: () => closeBanner(),
              className: "cursor-pointer hover:opacity-80 ",
              children: /* @__PURE__ */ jsx(CloseBtn, {})
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between items-center min-[1200px]:w-[550px] min-[1200px]:min-w-[550px] max-[1200px]:justify-start max-[1200px]:gap-[20px] max-[700px]:justify-between max-[700px]:gap-[10px] w-full", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => closeBanner(),
              className: cn(
                "h-[38px] w-[80px] border border-white-text rounded-[6px] cursor-pointer hover:opacity-80",
                "max-[1200px]:h-[28px] max-[1200px]:w-[64px] max-[1200px]:text-[10px]! "
              ),
              children: "Принять"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "max-[1200px]:text-[10px]", children: "Мы используем cookie для работы сайта." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "Закрыть баннер cookie",
              onClick: () => closeBanner(),
              className: "cursor-pointer hover:opacity-80 flex min-[700px]:hidden min-[1200px]:flex",
              children: /* @__PURE__ */ jsx(CloseBtn, {})
            }
          )
        ] })
      ]
    }
  );
}
function CloseBtn() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "43",
      height: "43",
      viewBox: "0 0 43 43",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M31.8201 10.606C25.9623 4.74812 16.4648 4.74812 10.6069 10.606C4.74905 16.4638 4.74905 25.9613 10.6069 31.8192C16.4648 37.677 25.9622 37.677 31.8201 31.8192C37.678 25.9613 37.678 16.4638 31.8201 10.606Z",
            stroke: "#EBEBEB",
            "stroke-width": "1.3",
            "stroke-miterlimit": "10"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28.6354 13.4902L13.9047 28.2209",
            stroke: "#EBEBEB",
            "stroke-width": "1.3"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M28.6354 28.6387L13.9047 13.908",
            stroke: "#EBEBEB",
            "stroke-width": "1.3"
          }
        )
      ]
    }
  );
}

const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const { noindex } = Astro2.props;
  return renderTemplate`<html lang="ru"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width">${noindex && renderTemplate`<meta name="robots" content="noindex, nofollow">`}<meta name="generator"${addAttribute(Astro2.generator, "content")}><link rel="preload" href="/fonts/TT%20Firs%20Neue%20Trial%20Var%20Roman.ttf" as="font" type="font/ttf" crossorigin="anonymous"><link rel="preload" href="/fonts/NyghtSerif-Light.woff2" as="font" type="font/woff2" crossorigin="anonymous"><title>ЕВРАЗИЯ - Международная премия 2026</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} ${renderComponent($$result, "Footer", $$Footer, {})} ${renderComponent($$result, "CookieAlert", CookieAlert, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@/components/shared/cookie/CookieAlert", "client:component-export": "default" })} </body></html>`;
}, "/Users/mac/Documents/Work/React/evra2/src/layouts/Layout.astro", void 0);

export { $$Layout as $, $$SocialIcons as a, createSvgComponent as b, cn as c };
