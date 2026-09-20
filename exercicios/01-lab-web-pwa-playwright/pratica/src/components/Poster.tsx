// Poster sem imagem externa: bloco colorido determinístico pela inicial do
// título. Mantém o app 100% offline e os screenshots de visual regression
// estáveis (imagem remota = fonte clássica de diff flaky).

const PALETTE = ['#2c5f8f', '#7c3aed', '#0f766e', '#b45309', '#9d174d', '#4d7c0f', '#1d4ed8'];

interface Props {
  title: string;
  small?: boolean;
}

export default function Poster({ title, small }: Props) {
  const initial = title.charAt(0).toUpperCase();
  const color = PALETTE[title.length % PALETTE.length];
  return (
    <div className={small ? 'poster small' : 'poster'} style={{ background: color }} aria-hidden>
      {initial}
    </div>
  );
}
