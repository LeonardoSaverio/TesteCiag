import React, { useState, useEffect } from 'react';

import './styles.css';
import { Jumbotron, Container, Spinner } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { FaShoppingCart } from 'react-icons/fa';
import { AiTwotoneStar } from 'react-icons/ai';

import api from '../../services/api';

interface Product {
  nome: string,
  preco: number,
  link: string,
  status: string
}

const WishList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  function formatWithIcon(link: string) {
    return (
      <a href={link} target="_blank" rel="noreferrer">
        <FaShoppingCart size={25} color="black" />
      </a>
    )
  }

  function formatBRMoney(preco: number) {
    return `R$ ${preco.toString().replace('.', ',')}`
  }

  const columns = [
    { dataField: 'nome', text: 'Nome' },
    { dataField: 'preco', text: 'Preço', formatter: formatBRMoney, align: 'center', headerAlign: 'center' },
    { dataField: 'link', text: '', formatter: formatWithIcon, align: 'center' },
  ]

  useEffect(() => {
    api.get('').then(response => {
      setProducts(response.data.produtos);
    })
    setLoading(true)
  }, [])

  return (
    <Container className="p-3">
      <Jumbotron className="header">
        <h1 id="mainTitle">Lista de desejos <span> <AiTwotoneStar /> </span></h1>
      </Jumbotron>
      <hr />
      {/* verificando se os dados estão carregados, caso contrario exibira um icone loading até carregar os dados */}
      {loading ? (
        <BootstrapTable
          keyField="link"
          data={products.filter(product => product.status === 'ativo')}
          columns={columns}
          striped
          hover
          bordered={false}
          noDataIndication='Sem registros :('
          pagination={paginationFactory({})}
        />
      ) : (
          <div className="spinner">
            <Spinner animation="border" />
          </div>
        )}
    </Container>
  )
}


export default WishList;