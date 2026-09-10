import Image from "next/image";

import { platformIcon } from "@/components/contact-icon";
import { linkHref, platformLabel } from "@/lib/contact";
import { visibleLinks } from "@/lib/people";
import type { Company } from "@/types";

export function CompanyCard({ company }: { company: Company }) {
  const links = visibleLinks(company.links);

  return (
    /*
     * Medidas do design: 155px de altura, raio 23px, fundo #EEEEEE e sombra
     * 0 0 9px 2px de preto a 20%.
     *
     * A largura NÃO é fixa de propósito. Os 286px do design são o resultado
     * dos recuos (42px do cartão escuro + 29px do painel, de cada lado, num
     * quadro de 428px). Travar em w-[286px] desalinha: o <li> do painel ocupa
     * a largura toda e o cartão encosta à esquerda, além de estourar em telas
     * menores que 428px e não acompanhar a ampliação do desktop.
     *
     * Logo e ícones ficam centralizados no eixo vertical: a folga sobrante
     * se divide igualmente acima do logo e abaixo dos ícones.
     */
    <article className="bg-company-card flex h-[135px] flex-col items-center justify-center rounded-[23px] px-5 shadow-[0_0_9px_2px_rgba(0,0,0,0.2)]">
      {/*
       * A altura desta caixa é o tamanho do logo — é o único número a mexer
       * para aumentá-lo ou diminuí-lo. Limitar pela altura (e não pela
       * largura) deixa logos de proporções diferentes (4,6:1 e 2,7:1)
       * opticamente do mesmo tamanho em todos os cartões.
       */}
      <div className="flex h-6.5 w-full items-center justify-center lg:h-9.5">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            width={640}
            height={160}
            className="max-h-full w-auto max-w-[72%] object-contain"
          />
        ) : (
          <span className="text-lg font-bold text-neutral-900">
            {company.name}
          </span>
        )}
      </div>

      {links.length > 0 && (
        <ul className="mt-7 flex items-center justify-center gap-6 lg:gap-8">
          {links.map((link) => {
            const Icon = platformIcon[link.platform];
            const label = `${platformLabel[link.platform]} — ${company.name}`;

            return (
              <li key={link.platform}>
                <a
                  href={linkHref(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-company-icon block transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon className="size-6 lg:size-7" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
