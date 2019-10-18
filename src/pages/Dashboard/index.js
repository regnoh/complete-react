import React, { useEffect } from "react";
import { Card, Row, Col } from "antd";
import { fetchAmounts } from "../../services/articles";
import "./index.less";
const Dashboard = () => {
  useEffect(() => {
    fetchAmounts().then(res => {
      console.log("TCL: Dashboard -> res", res);
    });
  }, []);
  // 生成随机16进制颜色： https://www.jianshu.com/p/54fc0fce46cc
  // const getRandomColor = () => {
  //   return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  // };
  // material design colors: https://www.materialui.co/colors
  const overViewData = [
    { id: 1, bgColor: "#F8BBD0", title: "文章总数", value: 188 },
    { id: 2, bgColor: "#FFF176", title: "浏览量总数", value: 88 },
    { id: 3, bgColor: "#039BE5", title: "访客总数", value: 48 },
    { id: 4, bgColor: "#A5D6A7", title: "更新总数", value: 18 }
  ];
  return (
    <>
      <Card title="概览" bordered={false}>
        <Row gutter={16}>
          {overViewData.map(({ id, bgColor, title, value }) => {
            return (
              <Col className="gutter-row" span={6} key={id}>
                <div className="yf-gutter-box" style={{ background: bgColor }}>
                  {title}: {value}
                </div>
              </Col>
            );
          })}
        </Row>
      </Card>
      <Card title="浏览量统计" bordered={false}>
        图表
      </Card>
    </>
  );
};

export default Dashboard;
