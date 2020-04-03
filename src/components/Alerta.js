import Typography from 'components/Typography';
import React, { useState, useEffect } from 'react';
import {
    Alert,
    Card,
    CardBody,
    CardHeader,
    Col,
    Row,
    UncontrolledAlert,
} from 'reactstrap';


const Alerta = () => {
    const [muestra, setMuestra] = useState(true);
    // De forma similar a componentDidMount y componentDidUpdate
    useEffect(() => {
        // Actualiza el título del documento usando la API del navegador
    
            window.setTimeout(()=>{
                setMuestra(false);
            },10000)

    });

    return (
        <Row>
            <Col>

                <Alert color="success" isOpen={muestra} >
                    <Typography type="h4" className="alert-heading">
                        Nuevo !!!! DR.COVID  ¿Cómo usarlo?
              </Typography>
                    <hr />
                    <Typography className="mb-0">
                        Empieza escribiendo un saludo como: hola o buenas tardes en el campo que dice ‘Escribe un mensaje..’ en el chat del lado derecho
                </Typography>
                </Alert>

            </Col>
        </Row>

    );
};

export default Alerta;
