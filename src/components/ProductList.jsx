import React from "react";

const ProductList = ({ products }) => {
  if (!products.length) {
    return <p>Nenhum personagem cadastrado</p>;
  }

  return (
    <div style={styles.container}>
      <ul style={styles.list}>
        {products.map((p) => (
          <li key={p.id} style={styles.card}>
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.nome}
                style={styles.productImage}
              />
            ) : (
              <div style={styles.noImage}>Sem imagem</div>
            )}

            <div style={styles.info}>
              <span style={styles.productName}>{p.nome}</span>

              {/* NOME DO AUTOR */}
              <span style={styles.detail}>
                <strong>Autor:</strong> {p.autor || "Desconhecido"}
              </span>

              {/* DATA DE ENVIO */}
              <span style={styles.detail}>
                <strong>Data:</strong>{" "}
                {p.dataCadastro?.toDate
                  ? p.dataCadastro.toDate().toLocaleDateString("pt-BR")
                  : new Date(p.dataCadastro).toLocaleDateString("pt-BR")}
              </span>

              {/* URL DA IMAGEM (Base64) */}
              {p.imageUrl && (
                <span style={styles.detail}>
                  <strong>URL da imagem:</strong>{" "}
                  <a href={p.imageUrl} target="_blank" rel="noreferrer">
                    Clique para ver
                  </a>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
  },
  list: {
    listStyle: "none",
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  card: {
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
    padding: 12,
    borderRadius: 10,
    border: "1px solid #e5e7eb",
    background: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  productImage: {
    width: 70,
    height: 70,
    objectFit: "cover",
    borderRadius: 8,
    flexShrink: 0,
  },
  noImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    background: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    color: "#9ca3af",
    flexShrink: 0,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    flex: 1,
  },
  productName: {
    fontWeight: 600,
    fontSize: 16,
    color: "#111827",
  },
  detail: {
    fontSize: 13,
    color: "#4b5563",
    wordBreak: "break-all",
  },
};

export default ProductList;