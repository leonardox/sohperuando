import React, { Component } from 'react';
import "./counter.css"

class Counter extends Component {
  state = {
    cruzada: 0.0,
    geral: 0.0,
    expondencial: 0.0,
    entradas: []
    }

  handleIncrement = () => {
    this.setState({ cruzada: 0.0 });
    this.setState({ geral: 0.0 });
    this.setState({ expondencial: 0.0 });
    this.setState({ entradas: [] });
    document.querySelector('#ff').value = "";
    document.querySelector('#fc').value = "";
    document.querySelector('#sf').value = "";
    document.querySelector('#sc').value = "";
    document.querySelector('#mgc').value = "";
    document.querySelector('#mgf').value = "";
  }

  primeiroAMarcar = (local_entradas, cruzada01, cruzada02) => {
    let media_01 = cruzada01 / 2.0;
    let media_02 = cruzada02 / 2.0;
    if (cruzada01 > cruzada02) {
      if (media_01 > 6.02 && (media_01 - media_02) >= 2.0) {
        let primeiro_a = {
          _id: "primeiroAMarcar",
          title: "TIME DA CASA MARCA PRIMEIRO",
          valor: Math.round(media_01 * 0.75),
        };
        local_entradas.push(primeiro_a);
      }
    } else {
      if (media_02 > 6.02 && (media_02 - media_01) >= 2.0) {
        let primeiro_a = {
          _id: "primeiroAMarcar",
          title: "TIME DE FORA MARCA PRIMEIRO",
          valor: Math.round(media_02 * 0.75),
        };
        local_entradas.push(primeiro_a);
      }
    }
  }

  handleDecrement = () => {
    let cruzada01 = 0.0;
    let cruzada02 = 0.0;
    cruzada01 = parseFloat(document.querySelector('#fc').value) +
      parseFloat(document.querySelector('#sf').value);
    cruzada02 = parseFloat(document.querySelector('#ff').value) +
      parseFloat(document.querySelector('#sc').value);
    let media_cruzada = (cruzada01 + cruzada02) / 2;
    this.setState({ cruzada: media_cruzada });
    let media_geral = (parseFloat(document.querySelector('#mgc').value) +
      parseFloat(document.querySelector('#mgf').value)) / 2;
    this.setState({ geral: media_geral });
    
    let media_expondencial = (media_cruzada + media_geral) / 2;
    this.setState({ expondencial: media_expondencial });

    let local_entradas = [];
    if (media_expondencial > 10.5) {
      let entrada_valor = Math.round(Math.round(media_expondencial) * 0.75) - 1;
      console.log(media_expondencial);
      let mais_de = {
        _id: "maisde",
        title: "MAIS DE",
        valor: entrada_valor,
      };
      local_entradas.push(mais_de);

      this.primeiroAMarcar(local_entradas, cruzada01, cruzada02);

    } else if (media_expondencial <= 8.50) {
      let jogos = media_expondencial;
      let entrada_valor = Math.round(jogos + ((jogos * 30.0) / 100)) + 1;
      console.log(media_expondencial);
      let menos_de = {
        _id: "menosde",
        title: "MENOS DE",
        valor: entrada_valor,
      };
      local_entradas.push(menos_de);
      this.primeiroAMarcar(local_entradas, cruzada01, cruzada02);
    } else {
      let menos_de = {
        _id: "sementrada",
        title: "SEM ENTRADAS NESSE JOGO",
        valor: "",
      };
      local_entradas.push(menos_de);
    }
    this.setState({ entradas: local_entradas });
  }

  render() {
    return (
      <React.Fragment>

        <div className="c">
          <div className="c-head">
            <h1 className='c-title'>TOU SÓ PERUANDO</h1>
          </div>
          <div className="c-body">
            



        <table className="table">
          <thead>
            <tr>
              <th className="col"></th>
              <th className="col">TIME DA CASA</th>
              <th className="col">TIME DE FORA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>Escanteios marcados</p>
              </td>
              <td><input type="text" placeholder="FEITOS EM CASA" id="fc"/></td>
              <td><input type="text" placeholder="FEITOS FORA" id="ff"/></td>
            </tr>
            <tr>
              <td>
                <p>Escanteios sofridos</p>
              </td>
              <td><input type="text" placeholder="SOFRIDOS EM CASA" id="sc"/></td>
              <td><input type="text" placeholder="SOFRIDOS FORA" id="sf"/></td>
            </tr>
            <tr>
              <td>
                <p>Média geral de escanteios</p>
              </td>
              <td><input type="text" placeholder="MÉDIA TIME CASA" id="mgc"/></td>
              <td><input type="text" placeholder="MÉDIA TIME FORA" id="mgf"/></td>
            </tr>              
          </tbody>
        </table>
        <div className="buttons">
          <button onClick={this.handleDecrement}>Peruar</button>
          <button onClick={this.handleIncrement} className='clear'>Limpar</button>
        </div>
        <br/>
        <br/>
        {this.state.entradas.map(entrada =>
          (entrada._id ==="sementrada" ? (<h1 className='c-entry'>{entrada.title}</h1>) : (<h1 className='c-value'>Entrada em {entrada.title} {entrada.valor}</h1>))
        )}
        </div>
        

        {/* <table className={this.getTableClasses()}>
          <thead>
            <tr>
              <th></th>
              <th className="col">ENTRADAS</th>
              <th className="col">VALOR</th>
            </tr>
          </thead>
          <tbody>
              {this.state.entradas.map(entrada => <tr key={entrada._id}><td></td>
              <td>{entrada.title}</td>
              <td>{entrada.valor}</td>
            </tr>)}
            {/* <tr><td></td><td><button onClick={this.handleDecrement}>Peruar</button></td>
            <td><button onClick={this.handleIncrement} className='clear'>Limpar</button></td></tr>        
          </tbody>
          </table> */}
          </div>
      </React.Fragment>
    );
  }

  getBadgeClasses() {
    let classes = 'badge m-2 bg-';
    classes += (this.state.expondencial > 10.5 || this.state.expondencial < 8.5) ? 'success' : 'warning';
    return classes;
  }

  getTableClasses() {
    let classes = 'table table-';
    classes += (this.state.expondencial > 10.5 || this.state.expondencial < 8.5) ? 'success' : 'warning';
    return classes;
  }

  formatCounter() {
    const { count } = this.state;
    return count === 0 ? 'Zero' : count;
  }
}

export default Counter;
