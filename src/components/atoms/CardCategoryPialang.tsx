interface CardCategoryPialangProps {
  title?: string;
}

export default function CardCategoryPialang({ title }: CardCategoryPialangProps) {
  return (
    <a
      href="/profil/wakil-pialang/daftar"
      className="border-2 border-green-500 p-10 text-2xl text-center uppercase rounded-lg bg-zinc-200 text-green-500 hover:border-green-600 hover:bg-zinc-300 hover:text-green-600 transition-all ease-in duration-300"
    >
      {title}
    </a>
  );
}