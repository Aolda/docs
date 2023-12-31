import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        AOLDA CLOUD는 직관적이고 사용자 친화적인 인터페이스를 제공하여, 클라우드
        리소스 관리 및 애플리케이션 배포가 간편합니다.
      </>
    ),
  },
  {
    title: "Low Cost",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        아주대학교 학생들은 경제적 부담 없이 AOLDA CLOUD 서비스를 이용할 수
        있어, 학습 및 프로젝트에 클라우드를 자유롭게 활용할 수 있습니다.
      </>
    ),
  },
  {
    title: "Open Source",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        오픈스택을 기반으로 한 AOLDA CLOUD는 투명하고 유연한 클라우드 서비스를
        제공하여, 학생들이 기술을 깊이 이해하고 맞춤화할 수 있는 기회를
        제공합니다.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
