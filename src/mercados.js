import React, { Component } from 'react';
import './style.min.css';

const api = 'https://mercados.ambito.com/home/general'
const currentMercados = [
  'Dólar Oficial',
  'Dólar Informal',
  'Euro',
  'Merval Argentina'
]

class Mercados extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mercados: false
    } 
  }
  
  async componentDidMount() {
    const resp = await fetch(api)
    const mercadosFull = await resp.json()

    var mercados = []

    mercadosFull.forEach((mercado, key) => {
      if (currentMercados.includes(mercado.nombre)) {
        mercados.push(mercado)
      }
    })
    
    this.setState({
      mercados
    });
  }

  render() {
    return (
      <div className="widget-currency">
        {this.state.mercados && this.state.mercados.map((mercado, key) => {
          if (mercado.compra) {
            return(
              <div key={key} className="widget-currency-col" data-visibility="true" data-position={`position-${key+1}`}>
                  <div className="href">
                      <h4>{mercado.nombre}</h4>
                      <span>{mercado.compra} / </span>
                      <span>{mercado.venta} </span>
                      <label className={`${mercado['class-variacion'] === 'up' ? 'true' : 'false'}`}>{mercado.variacion}</label>
                  </div>
              </div>
            )
          } else {
            return(
              <div key={key} className="widget-currency-col" data-visibility="true" data-position={`position-${key+1}`}>
                  <div className="href">
                      <h4>{mercado.nombre}</h4>
                      <span>{mercado.ultimo} </span>
                      <label className={`${mercado['class-variacion'] === 'up' ? 'true' : 'false'}`}>{mercado.variacion}</label>
                  </div>
              </div>
            )
          }
        })}
      </div>
    );
  }
}

export default Mercados;
