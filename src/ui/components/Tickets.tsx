import { Ticket } from '../../domain/entities/Ticket';

interface TicketsProps {
  tickets: Ticket[];
}

export default function Tickets({ tickets }: TicketsProps) {
  return (
    <section id="tickets" className="py-24 bg-gradient-to-b from-black via-cyan-950/10 to-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[200px] animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[200px] animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BOLETOS
            </span>
          </h2>
          <p className="text-gray-400 text-lg font-mono">
            ▸ ELIGE TU EXPERIENCIA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tickets.map((ticket, index) => {
            const isVIP = ticket.type === 'vip';
            const isSoldOut = !ticket.available;

            return (
              <div
                key={ticket.id}
                className={`relative p-8 border-2 transition-all duration-300 ${
                  isVIP
                    ? 'bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500 scale-105 md:scale-110'
                    : 'bg-black/50 border-cyan-500/30 hover:border-cyan-500'
                } ${isSoldOut ? 'opacity-60' : 'hover:scale-105'}`}
              >
                {/* VIP Badge */}
                {isVIP && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm">
                    ⭐ MEJOR OPCIÓN
                  </div>
                )}

                {/* Sold out overlay */}
                {isSoldOut && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rotate-12">
                    AGOTADO
                  </div>
                )}

                <div className="text-center">
                  <h3 className={`text-3xl font-black mb-2 ${isVIP ? 'text-pink-400' : 'text-cyan-400'}`}>
                    {ticket.name}
                  </h3>

                  <div className="mb-6">
                    <div className={`text-5xl font-black ${isVIP ? 'text-purple-400' : 'text-white'}`}>
                      ${ticket.price}
                    </div>
                    <div className="text-gray-400 text-sm font-mono">MXN</div>
                  </div>

                  <div className="mb-8 space-y-3 text-left">
                    {ticket.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 ${isVIP ? 'bg-pink-500' : 'bg-cyan-500'} flex-shrink-0`}></div>
                        <span className="text-gray-300 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={isSoldOut}
                    className={`w-full py-4 font-bold text-lg transition-all ${
                      isSoldOut
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : isVIP
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]'
                        : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]'
                    }`}
                  >
                    {isSoldOut ? 'AGOTADO' : 'COMPRAR AHORA'}
                  </button>
                </div>

                {/* Corner accents */}
                <div className={`absolute top-0 left-0 w-3 h-3 ${isVIP ? 'bg-pink-500' : 'bg-cyan-500'}`}></div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${isVIP ? 'bg-pink-500' : 'bg-cyan-500'}`}></div>
              </div>
            );
          })}
        </div>

        {/* Additional info */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="p-6 bg-black/50 border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-cyan-400 font-mono text-sm">
                INFORMACIÓN DE COMPRA
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300 text-sm">
              <div>
                <h4 className="text-white font-bold mb-2">Formas de Pago</h4>
                <ul className="space-y-1">
                  <li>• Tarjetas de crédito/débito</li>
                  <li>• Transferencia bancaria</li>
                  <li>• Pago en efectivo (puntos autorizados)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-2">Políticas</h4>
                <ul className="space-y-1">
                  <li>• No hay reembolsos</li>
                  <li>• Boleto digital enviado por email</li>
                  <li>• Reventa no autorizada</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
