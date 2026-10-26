
function CardProjeto({ nome, descricao, tecnologias, link_githb, ano}) {
  return (
        <article className="card">
            <h3>{nome}</h3>
            <p className="meta">{tecnologias} . {ano}</p>
            <p>{descricao}</p>
            <a href={link_githb}>Ver no Github</a>
        </article>
  );
}

export default CardProjetos;
