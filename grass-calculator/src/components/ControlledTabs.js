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
import { useEffect, useLayoutEffect, useState } from "react";

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
  const [key, setKey] = useState("מינימום חיבורים + כיוון סיב אחיד בין הגלילים");
  const [perutTitle, setPerutTitle] = useState("מינימום חיבורים + כיוון סיב אחיד בין הגלילים");
  const [arrayUsed, setArratUsed] = useState(resultMinChiburWithDirection);
  
  useEffect(() => {
   
      if (key === "מינימום פחת") {
        setArratUsed(resultForClientPchat)
      }
      else if (key === 'מינימום פחת + כיוון סיב אחיד בין הגלילים') {
        setArratUsed(resultPchatWithDirection)
      }
      else if (key === 'מינימום חיבורים') {
        setArratUsed(resultMinChiburNoDirection)
      }
      else if (key === 'מינימום חיבורים + כיוון סיב אחיד בין הגלילים') {
        setArratUsed(resultMinChiburWithDirection)
      }
    },[key]);
  

  return (
    <>
      <Tabs
        className='tabs'
        id='controlled-tab'
        activeKey={key}
        onSelect={(k) => (setKey(k) , setPerutTitle(k))}
      >
        {Object.entries(summary).map(([objKey, value], i) => (
          // {/* <Tab eventKey="מינימום פחת + כיוון סיב אחיד" title= "מינימום פחת + כיוון סיב אחיד"> */}
          <Tab eventKey={value.title} title={value.title}>
            {/* <Container style={{ textAlign: "right", display:"flex", flexDirection:"column", alignItems:"center"}}> */}
            <Row style={{ direction: "rtl", margin: "0 20px" }}>
              <h2> סה"כ להזמנה </h2> <h3> (לצפיה בפירוט יש לגלול לתחתית המסך) </h3>
              <Card
                className='mr-5 mt-5 '
                border='secondary'
                style={{ width: "100%" }}
              >
                <Card.Body>
                  <Row md={12}>
                  <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                      
                          
                            <strong> גלילים ברוחב 2 מטר</strong> <hr></hr>
                           
                          
                      
                        
                          {value.opt2 > 25 ? (
                          <>
                              <p> סהכ אורך:{value.opt4length.toFixed(2)} מטר.</p>
                            <p> כמות גלילים באורך 25 מטר:   {Math.floor(value.opt2length / 25)} גלילים.</p>
                            {value.opt2length % 25 ? (
                            <p>ובנוסף גליל באורך {value.opt2* value.opt2length % 25} מטר.</p>

                            ) : null}
                          </>
                     
                        ) : 
                        // value.opt2 * value.opt2length >= 25  ? (
                          // <>
                       
                          // <p>כמות גלילים באורך 25 מטר:  {Math.floor(value.opt2 * value.opt2length / 25)}</p>

                          // {value.opt2 * value.opt2length % 25?(
                          //   <>
                          //   <p>ובנוסף גליל באורך {value.opt2 * value.opt2length % 25} </p>
                          //   </>
                          //   ):null}
                              
                          //   </>) :
                             <>
                             <p>כמות:{value.opt2} גלילים.</p>
                          <p> באורך: {value.opt2length} מטר. </p>
                          </>
                        }
                          
                                                                                                  
                         {value.opt2 ? <br></br> : null}
                      </Card.Text>
                    </Col>
                  

                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                     
                            <strong> גלילים ברוחב 3 מטר</strong> <hr></hr>
                           
                         
                      
                        
                          {value.opt3 > 25 ? (
                          <>
                                              
                                              <p> סהכ אורך:{value.opt3length.toFixed(2)} מטר.</p>

                            <p> כמות גלילים באורך 25 מטר:   {Math.floor(value.opt3length / 25)} גלילים.</p>
                            {value.opt3length % 25 ? (
                            <p>ובנוסף גליל באורך {value.opt3* value.opt3length % 25} מטר.</p>

                            ) : null}
                          </>
                     
                        ) : 
                        // value.opt3 * value.opt3length >= 25  ? (
                        //   <>
                       
                        //   <p>כמות גלילים באורך 25 מטר:  {Math.floor(value.opt3 * value.opt3length / 25)}</p>

                        //   {value.opt3 * value.opt3length % 25?(
                        //     <>
                        //     <p>ובנוסף גליל באורך {value.opt3 * value.opt3length % 25} </p>
                        //     </>
                        //     ):null}
                              
                        //     </>) : 
                            <>
                            <p>כמות:{value.opt3} גלילים.</p>
                         <p> באורך: {value.opt3length} מטר. </p>
                         </>}
                          
                                                                                                  
                         {value.opt3 ? <br></br> : null}
                      </Card.Text>
                    </Col>






                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                     
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                          
                          </>
                      
                        
                        {value.opt4length > 25 ? (
                          <>
                                              
                                              <p> סהכ אורך:   {value.opt4length.toFixed(2)} מטר.</p>

                            <p> כמות גלילים באורך 25 מטר:   {Math.floor(value.opt4length / 25)} גלילים.</p>
                            {value.opt4length % 25 ? (
                              <p>ובנוסף גליל  {(value.opt4length % 25).toFixed(2)} מטר.</p>

                            ) : null}
                          </>
                     
                        ) :
                          // value.opt4 * value.opt4length >= 25 ? (                            // console.log('value:', value) 
                          // <>
                          //     {console.log('valueOpt4length:', value.opt4length)}
                          //     {console.log('valueOpt4:', value.opt4)}

                          // <p>כמות גלילים באורך 25 מטר:  {Math.floor(value.opt4 * value.opt4length / 25)}</p>

                          // {value.opt4 * value.opt4length % 25?(
                          //   <>
                          //   <p>ובנוסף גליל באורך {value.opt4 * value.opt4length % 25} </p>
                          //   </>
                          //   ):null}
                              
                          // </>) : 
                            <>
                          <p>כמות:{value.opt4} גלילים.</p>
                       <p> באורך: {value.opt4length} מטר. </p>
                       </>
                              }
                          
                                                                                                  
                         {value.opt4 ? <br></br> : null}
                      </Card.Text>
                    </Col>


                    <Col md={3}>
                      <Card.Text style={{ textAlign: "right" }}>
                        <strong> סה"כ פחת </strong>
                        <hr></hr>
         {value.pchat>0 ?
                        <span> {(+value.pchat).toFixed(2)} מ"ר.</span>
                        // <br></br>
                      : <span> אין פחת</span>}
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

        פירוט - {perutTitle}
         
      </h1>


      {/* {key === "מינימום פחת" && ( */}
        <>
          {/* <strong>מינימום פחת-פירוט</strong><br></br> */}

          <Row className='m-3'>
            {arrayUsed.map((square, index) => {
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

                        {square.opt4.amount ? (
                          <>
                            <strong> גלילים ברוחב 4 מטר</strong> <hr></hr>
                            <p>כמות : {square.opt4.amount} גלילים.</p>
                            <p>אורך : {square.opt4.length} מטר לכל גליל.</p>
                          </>) : null}
                        
                        
                        
                          {square.opt4.length > 25 ? (
                          <>
                                                      <strong>סה"כ גלילים של 4 להזמנה</strong>

                            <p> כמות גלילים באורך 25 מטר:   {Math.floor(square.opt4.length*square.opt4.amount / 25)} גלילים. </p>
                            {square.opt4.length % 25 ? (
                            <p>ובנוסף גליל באורך {(square.opt4.amount * square.opt4.length % 25).toFixed(2)} מטר.</p>

                            ) : null}
                          </>
                        // ) : null}
                        ) : 
                        square.opt4.amount * square.opt4.length >= 25  ? (
                          <>
                          <strong>סה"כ גלילים של 4 להזמנה</strong>
                          <p>{Math.floor(square.opt4.amount * square.opt4.length / 25)}גלילים מלאים(באורך 25 מטר).</p>

                          {square.opt4.amount * square.opt4.length % 25?(
                            <>
                            <p>ובנוסף גליל באורך {(square.opt4.amount * square.opt4.length % 25).toFixed(2)} מטר.</p>
                            </>
                            ):null}
                              
                          </>) : null}
                          
                                                                                                  
                         {square.opt4.amount ? <br></br> : null}

                        
                         {square.opt3.amount ? (
                          <>
                            <strong> גלילים ברוחב 3 מטר</strong> <hr></hr>
                            <p>כמות : {square.opt3.amount} מטר.</p>
                            <p>אורך : {square.opt3.length} מטר.</p>
                          </>) : null}
                        
                          
                        {square.opt3.length > 25 ? (
                          <>
                                                      <strong>סה"כ גלילים של 3 להזמנה</strong>

                            <p>   {Math.floor(square.opt3.length*square.opt3.amount / 25)}גלילים מלאים(באורך 25 מטר).</p>
                            {square.opt3.length % 25 ? (
                            <p>ובנוסף גליל באורך {(square.opt3.amount * square.opt3.length % 25).toFixed(2)} מטר.</p>

                            ) : null}
                          </>
                        // ) : null}
                        ) : 
                        square.opt3.amount * square.opt3.length >= 25  ? (
                          <>
                          <strong>סה"כ גלילים של 3 להזמנה</strong>
                          <p> {Math.floor(square.opt3.amount * square.opt3.length / 25)} גלילים מלאים(באורך 25 מטר).</p>

                          {square.opt3.amount * square.opt3.length % 25?(
                            <>
                           
                            <p>ובנוסף גליל באורך {(square.opt3.amount * square.opt3.length % 25).toFixed(2)} מטר. </p>
                            </>
                            ):null}
                              
                          </>) : null}
                          

                      
                        {square.opt3.amount ? <br></br> : null}




                        
                        {square.opt2.amount ? (
                          <>
                            <strong> גלילים ברוחב 2 מטר</strong> <hr></hr>
                            <p>כמות : {square.opt2.amount} גלילים.</p>
                            <p>אורך : {square.opt2.length} מטר.</p>
                          </>) : null}
                        
                          
                        {square.opt2.length > 25 ? (
                          <>
                                                      <strong>סה"כ גלילים של 2 להזמנה</strong>

                            <p>  {Math.floor(square.opt2.length*square.opt2.amount/ 25)} גלילים מלאים(באורך 25 מטר).</p>
                            {square.opt2.length % 25 ? (
                            <p>ובנוסף גליל באורך {(square.opt2.amount * square.opt2.length % 25).toFixed(2)} מטר.</p>

                            ) : null}
                          </>
                        // ) : null}
                        ) : 
                        square.opt2.amount * square.opt2.length >= 25  ? (
                          <>
                          <strong>סה"כ גלילים של 2 להזמנה</strong>
                          <p>  {Math.floor(square.opt2.amount * square.opt2.length / 25)} מטר.</p>

                          {square.opt2.amount * square.opt2.length % 25?(
                            <>
                             <p>ובנוסף גליל באורך {(square.opt2.amount * square.opt2.length % 25).toFixed(2)} מטר.</p>
                            </>
                            ):null}
                              
                          </>) : null}
                          

                      
                        {square.opt2.amount ? <br></br> : null}


                        
                        {square.pchat ? (
                          <>
                            <strong>
                              פחת<hr></hr>
                            </strong>
                            <p>סה"כ   {square.pchat} מ"ר.</p>
                            <hr></hr>
                            {/* <strong>פירוט פחת</strong>  <hr></hr>
                            <>
                              {square.opt4.amount && square.opt4.amount * 4-square.initialWidth-square.opt3.amount * 3-square.opt2.amount * 2 > 0 ? (
                              <p> {square.opt4.length} מטר על {(square.opt4.amount * 4-square.initialWidth).toFixed(1)} מטר    </p>
                        ):null }</> 
                            <>
                            {square.opt3.amount && square.opt3.amount * 3-square.initialWidth-square.opt4.amount * 4-square.opt2.amount * 2 > 0 ? (
                              <p> 3 מטר על {(square.opt3.amount * 3-square.initialWidth).toFixed(1)} מטר    </p>
                        ):null }</> 
                            <>
                            {square.opt2.amount && square.opt2.amount * 2-square.initialWidth-square.opt3.amount * 3-square.opt4.amount * 4 > 0 ? (
                              <p> 2 מטר על {(square.opt2.amount * 2-square.initialWidth).toFixed(1)} מטר    </p>
                        ):null }</>  */}
                                
                           
                          </>
                        ) : (
                          <>
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
      
 
      {/* ) */}
      {/* } */}
    </>
  );
}
