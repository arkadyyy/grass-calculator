import "../App.css";
import Konva from "../components/Konva";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  InputGroup,
  FormControl,
  Modal,
  Form,
  Card,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  CardColumns,
} from "react-bootstrap";
import { useEffect, useState } from "react";

export default function ControlledTabs({
  summary,
  squares,
  setsquares,
  x_directionResultForClient,
  y_directionResultForClient,
  resultForClientPchat,
  resultPchatWithDirection,
  resultMinChiburWithDirection,
  resultMinChiburNoDirection,
}) {
  const [key, setKey] = useState("מינימום פחת");
  return (
    <>
      <Tabs
        className='tabs'
        id='controlled-tab'
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {Object.entries(summary).map(([objKey, value], i) => (
          // {/* <Tab eventKey="מינימום פחת + כיוון סיב אחיד" title= "מינימום פחת + כיוון סיב אחיד"> */}
          <Tab eventKey={value.title} title={value.title}>
            {/* <Container style={{ textAlign: "right", display:"flex", flexDirection:"column", alignItems:"center"}}> */}
            <Row style={{ direction: "rtl", margin: "0 20px" }}>
              <Card
                className='mr-5 mt-5 '
                border='secondary'
                style={{ width: "100%" }}
              >
                <Card.Body>
                  <Row md={12}>
                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                        <strong> סה"כ גלילים ברוחב 2 מטר </strong>
                        <hr></hr>

                        <>
                          {value.opt2 >= 1 ? (
                            <>
                              {value.opt2length < 25 ? (
                                <>
                                  <span>כמות: 1</span>
                                  <span>באורך:{value.opt2length}</span>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div>גליל אחד באורך 25 מטר</div>
                                  <span>
                                    ועוד גליל אחד באורך:
                                    {value.opt2length - 25}מטר
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {" "}
                              <span>כמות: 0</span>{" "}
                            </>
                          )}
                        </>
                        <br></br>
                      </Card.Text>
                    </Col>
                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                        <strong> סה"כ גלילים ברוחב 3 מטר </strong>
                        <hr></hr>
                        <>
                          {value.opt3 >= 1 ? (
                            <>
                              {value.opt3length < 25 ? (
                                <>
                                  <span>כמות: 1</span>
                                  <span>באורך:{value.opt3length}</span>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div>גליל אחד באורך 25 מטר</div>
                                  <span>
                                    ועוד גליל אחד באורך:
                                    {value.opt3length - 25}מטר
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {" "}
                              <span>כמות: 0</span>{" "}
                            </>
                          )}
                        </>
                        <br></br>
                      </Card.Text>
                    </Col>
                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                        <strong> סה"כ גלילים ברוחב 4 מטר </strong>
                        <hr></hr>
                        <>
                          {value.opt4 >= 1 ? (
                            <>
                              {value.opt4length < 25 ? (
                                <>
                                  <span>כמות: 1</span>
                                  <span>באורך:{value.opt4length}</span>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <div>גליל אחד באורך 25 מטר</div>
                                  <span>
                                    ועוד גליל אחד באורך:
                                    {value.opt4length - 25}מטר
                                  </span>
                                </>
                              )}
                            </>
                          ) : (
                            <>
                              {" "}
                              <span>כמות: 0</span>{" "}
                            </>
                          )}
                        </>
                        <br></br>
                      </Card.Text>
                    </Col>
                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                        <strong> סה"כ פחת </strong>
                        <hr></hr>
                        <span>מ"ר{(+value.pchat).toFixed(2)}</span>
                        <br></br>
                      </Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>

            <Row>
              <Col md={12}>
                <Konva
                  yDirectionSquare={y_directionResultForClient}
                  xDirectionSquare={x_directionResultForClient}
                  resultForClientPchat={resultForClientPchat}
                  resultPchatWithDirection={resultPchatWithDirection}
                  resultMinChiburWithDirection={resultMinChiburWithDirection}
                  resultMinChiburNoDirection={resultMinChiburNoDirection}
                  summary={summary}
                  tabKey={key}
                  squares={squares}
                  setsquares={setsquares}
                  type='bottom'
                />
              </Col>
            </Row>
            {/* </Container> */}
          </Tab>
        ))}
      </Tabs>

      <h1 className='tabs' style={{ textAlign: "right", marginTop: "40px" }}>
        פירוט
      </h1>

      {key === "מינימום פחת" && (
        <>
          {/* <strong>מינימום פחת-פירוט</strong><br></br> */}

          <Row className='m-3'>
            {resultForClientPchat.map((square, index) => {
              return (
                <>
                  <Col md={3} style={{ margin: "1rem" }}>
                    <Card
                      border='dark'
                      //  bg={'secondary'}
                      // bg={variant.toLowerCase()}
                      // key={idx}
                      // text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                      text={"black"}
                      style={{ width: "18rem" }}
                    >
                      <Card.Header style={{ background: `${square.color}` }}>
                        <h1> מלבן מספר {index + 1} </h1>
                        אורך: {square.initialLength}מטר רוחב:
                        {square.initialWidth}מטר
                      </Card.Header>
                      <Card.Text className='perutCardText'>
                        {square.opt4.amount === 1 && square.opt4.length < 25 ? (
                          <>
                            <strong> גליל אחד ברוחב 4 מטר</strong> <hr></hr>
                            {/* <p>כמות:{square.opt4.amount}</p> */}
                            <p> באורך: {square.opt4.length} מטר </p>
                          </>
                        ) : square.opt4.amount > 1 &&
                          square.opt4.length < 25 ? (
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                            <p>כמות:{square.opt4.amount}</p>
                            <p> באורך: {square.opt4.length} מטר כל אחד </p>
                          </>
                        ) : square.opt4.length > 25 ? (
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                            <p>גליל אחד באורך 25 מטר</p>
                            <p>
                              {" "}
                              ובנוסף: גליל אחד באורך {square.opt4.length -
                                25}{" "}
                              מטר
                            </p>
                          </>
                        ) : null}
                        {square.opt4.amount ? <br></br> : null}

                        {square.opt3.amount === 1 && square.opt3.length < 25 ? (
                          <>
                            <strong> גליל אחד ברוחב 3 מטר</strong> <hr></hr>
                            {/* <p>כמות:{square.opt4.amount}</p> */}
                            <p> באורך: {square.opt3.length} מטר </p>
                          </>
                        ) : square.opt3.amount > 1 &&
                          square.opt3.length < 25 ? (
                          <>
                            <strong> גלילים ברוחב 3 מטר</strong> <hr></hr>
                            <p>כמות:{square.opt3.amount}</p>
                            <p> באורך: {square.opt3.length} מטר כל אחד </p>
                          </>
                        ) : square.opt3.length > 25 ? (
                          <>
                            <strong> גלילים ברוחב 3 מטר</strong> <hr></hr>
                            <p>גליל אחד באורך 25 מטר</p>
                            <p>
                              {" "}
                              ובנוסף: גליל אחד באורך {square.opt3.length -
                                25}{" "}
                              מטר
                            </p>
                          </>
                        ) : null}
                        {square.opt3.amount ? <br></br> : null}

                        {square.opt2.amount === 1 && square.opt2.length < 25 ? (
                          <>
                            <strong> גליל אחד ברוחב 2 מטר</strong> <hr></hr>
                            <p> באורך: {square.opt2.length} מטר </p>
                          </>
                        ) : square.opt2.amount > 1 &&
                          square.opt2.length < 25 ? (
                          <>
                            <strong> גלילים ברוחב 2 מטר</strong> <hr></hr>
                            <p>כמות:{square.opt2.amount}</p>
                            <p> באורך: {square.opt2.length} מטר כל אחד </p>
                          </>
                        ) : square.opt2.length > 25 ? (
                          <>
                            <strong> גלילים ברוחב 2 מטר</strong> <hr></hr>
                            <p>גליל אחד באורך 25 מטר</p>
                            <p>
                              {" "}
                              ובנוסף: גליל אחד באורך {square.opt2.length -
                                25}{" "}
                              מטר
                            </p>
                          </>
                        ) : null}
                        {square.opt2.amount ? <br></br> : null}

                        {square.pchat ? (
                          <>
                            <strong>
                              סה"כ פחת<hr></hr>
                            </strong>
                            {square.pchat} מ"ר
                            <p>
                              מטר אורך
                              <strong>
                                {square.initialWidth}X
                                {Math.abs(
                                  +square.initialLength -
                                    +square.opt4.amount * 4 -
                                    +square.opt3.amount * 3
                                ).toFixed(2)}
                              </strong>
                              מטר אורך
                            </p>
                          </>
                        ) : (
                          <>
                            {" "}
                            <strong>
                              אין פחת<hr></hr>
                            </strong>
                          </>
                        )}
                      </Card.Text>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </>
      )}

      {key === "מינימום פחת + כיוון סיב אחיד בין הגלילים" && (
        <>
          <Row className='m-3'>
            {resultPchatWithDirection.map((square, index) => {
              return (
                <>
                  <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                    <Card border='dark' style={{ width: "18rem" }}>
                      <Card.Header style={{ background: `${square.color}` }}>
                        <h1> מלבן מספר {index + 1} </h1>
                        אורך: {square.initialLength}מטר רוחב:
                        {square.initialWidth}מטר
                      </Card.Header>
                      <Card.Text className='perutCardText'>
                        {square.opt4.amount ? (
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                            <p>כמות:{square.opt4.amount}</p>
                            <p> באורך: {square.opt4.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt4.amount ? <br></br> : null}
                        {square.opt3.amount ? (
                          <>
                            <strong> גלילים ברוחב 3 מטר</strong>
                            <hr></hr>
                            <p>כמות:{square.opt3.amount}</p>
                            <p> באורך: {square.opt3.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt3.amount ? <br></br> : null}
                        {square.opt2.amount ? (
                          <>
                            <strong> גלילים ברוחב 2 מטר</strong>
                            <hr></hr>
                            <p>כמות:{square.opt2.amount}</p>
                            <p> באורך: {square.opt2.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt2.amount ? <br></br> : null}
                        <strong>
                          {" "}
                          סה"כ פחת<hr></hr>
                        </strong>
                        {square.pchat} מ"ר
                      </Card.Text>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </>
      )}

      {key === "מינימום חיבורים" && (
        <>
          <Row className='m-3'>
            {resultMinChiburNoDirection.map((square, index) => {
              return (
                <>
                  <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                    <Card border='dark' style={{ width: "18rem" }}>
                      <Card.Header style={{ background: `${square.color}` }}>
                        <h1> מלבן מספר {index + 1} </h1>
                        אורך: {square.initialLength}מטר רוחב:
                        {square.initialWidth}מטר
                      </Card.Header>
                      <Card.Text className='perutCardText'>
                        {square.opt4.amount ? (
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                            <p>כמות:{square.opt4.amount}</p>
                            <p> באורך: {square.opt4.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt4.amount ? <br></br> : null}
                        {square.opt3.amount ? (
                          <>
                            <strong> גלילים ברוחב 3 מטר</strong>
                            <hr></hr>
                            <p>כמות:{square.opt3.amount}</p>
                            <p> באורך: {square.opt3.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt3.amount ? <br></br> : null}
                        {square.opt2.amount ? (
                          <>
                            <strong> גלילים ברוחב 2 מטר</strong>
                            <hr></hr>
                            <p>כמות:{square.opt2.amount}</p>
                            <p> באורך: {square.opt2.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt2.amount ? <br></br> : null}
                        <strong>
                          {" "}
                          סה"כ פחת<hr></hr>
                        </strong>
                        {square.pchat} מ"ר
                      </Card.Text>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </>
      )}
      {key === "מינימום חיבורים + כיוון סיב אחיד בין הגלילים" && (
        <>
          <Row className='m-3'>
            {resultMinChiburWithDirection.map((square, index) => {
              return (
                <>
                  <Col md={3} style={{ padding: "1rem", margin: "1rem" }}>
                    <Card border='dark' style={{ width: "18rem" }}>
                      <Card.Header style={{ background: `${square.color}` }}>
                        <h1> מלבן מספר {index + 1} </h1>
                        אורך: {square.initialLength}מטר רוחב:
                        {square.initialWidth}מטר
                      </Card.Header>
                      <Card.Text className='perutCardText'>
                        {square.opt4.amount ? (
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                            <p>כמות:{square.opt4.amount}</p>
                            <p> באורך: {square.opt4.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt4.amount ? <br></br> : null}
                        {square.opt3.amount ? (
                          <>
                            <strong> גלילים ברוחב 3 מטר</strong>
                            <hr></hr>
                            <p>כמות:{square.opt3.amount}</p>
                            <p> באורך: {square.opt3.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt3.amount ? <br></br> : null}
                        {square.opt2.amount ? (
                          <>
                            <strong> גלילים ברוחב 2 מטר</strong>
                            <hr></hr>
                            <p>כמות:{square.opt2.amount}</p>
                            <p> באורך: {square.opt2.length} מטר </p>
                          </>
                        ) : null}
                        {square.opt2.amount ? <br></br> : null}
                        <strong>
                          {" "}
                          סה"כ פחת<hr></hr>
                        </strong>
                        {square.pchat} מ"ר
                      </Card.Text>
                    </Card>
                  </Col>
                </>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
}
