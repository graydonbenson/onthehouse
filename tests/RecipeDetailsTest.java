// Generated by Selenium IDE
import org.junit.Test;
import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNot.not;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Alert;
import org.openqa.selenium.Keys;
import java.util.*;
import java.net.MalformedURLException;
import java.net.URL;
public class RecipeDetailsTest {
  private WebDriver driver;
  private Map<String, Object> vars;
  JavascriptExecutor js;
  @Before
  public void setUp() {
    driver = new ChromeDriver();
    js = (JavascriptExecutor) driver;
    vars = new HashMap<String, Object>();
  }
  @After
  public void tearDown() {
    driver.quit();
  }
  @Test
  public void testAuthorizedViewRecipeDetails() {
    // Test name: TestAuthorizedViewRecipeDetails
    // Step # | name | target | value
    // 1 | open | /dashboard | 
    driver.get("https://seng-401-on-the-house.web.app/dashboard");
    // 2 | waitForElementPresent | css=.MuiButton-root | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiButton-root")));
    }
    // 3 | assertText | xpath=(//button[@type='button'])[2] | LOGOUT
    assertThat(driver.findElement(By.xpath("(//button[@type=\'button\'])[2]")).getText(), is("LOGOUT"));
    // 4 | click | css=.MuiGrid-root:nth-child(1) .MuiCardMedia-root | 
    driver.findElement(By.cssSelector(".MuiGrid-root:nth-child(1) .MuiCardMedia-root")).click();
    // 5 | waitForElementPresent | css=.MuiTypography-root:nth-child(5) | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiTypography-root:nth-child(5)")));
    }
    // 6 | assertText | css=.MuiTypography-root:nth-child(5) | Ingredients:
    assertThat(driver.findElement(By.cssSelector(".MuiTypography-root:nth-child(5)")).getText(), is("Ingredients:"));
  }
  @Test
  public void testUnauthorizedViewRecipeDetails() {
    // Test name: TestUnauthorizedViewRecipeDetails
    // Step # | name | target | value
    // 1 | open | / | 
    driver.get("https://seng-401-on-the-house.web.app/");
    // 2 | click | css=.MuiButton-containedWarning | 
    driver.findElement(By.cssSelector(".MuiButton-containedWarning")).click();
    // 3 | click | css=.MuiGrid-root:nth-child(1) .MuiCardMedia-root | 
    driver.findElement(By.cssSelector(".MuiGrid-root:nth-child(1) .MuiCardMedia-root")).click();
    // 4 | assertText | css=.MuiTypography-h5 | Sign in
    assertThat(driver.findElement(By.cssSelector(".MuiTypography-h5")).getText(), is("Sign in"));
  }
  @Test
  public void testComment() {
    // Test name: TestComment
    // Step # | name | target | value
    // 1 | open | /dashboard | 
    driver.get("https://seng-401-on-the-house.web.app/dashboard");
    // 2 | waitForElementPresent | css=.MuiButton-root | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiButton-root")));
    }
    // 3 | assertText | xpath=(//button[@type='button'])[2] | LOGOUT
    assertThat(driver.findElement(By.xpath("(//button[@type=\'button\'])[2]")).getText(), is("LOGOUT"));
    // 4 | click | css=.MuiGrid-root:nth-child(1) .MuiCardMedia-root | 
    driver.findElement(By.cssSelector(".MuiGrid-root:nth-child(1) .MuiCardMedia-root")).click();
    // 5 | waitForElementPresent | css=.MuiTypography-root:nth-child(5) | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiTypography-root:nth-child(5)")));
    }
    // 6 | assertText | css=.MuiTypography-root:nth-child(5) | Ingredients:
    assertThat(driver.findElement(By.cssSelector(".MuiTypography-root:nth-child(5)")).getText(), is("Ingredients:"));
    // 7 | click | id=:rf: | 
    driver.findElement(By.id(":rf:")).click();
    // 8 | type | id=:rf: | testing comment
    driver.findElement(By.id(":rf:")).sendKeys("testing comment");
    // 9 | click | css=.MuiButtonBase-root:nth-child(2) path | 
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(2) path")).click();
    // 10 | waitForElementPresent | css=.css-1475nf7 | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".css-1475nf7")));
    }
    // 11 | assertElementPresent | css=.css-1475nf7 | 
    {
      List<WebElement> elements = driver.findElements(By.cssSelector(".css-1475nf7"));
      assert(elements.size() > 0);
    }
  }
  @Test
  public void testDownvote() {
    // Test name: TestDownvote
    // Step # | name | target | value
    // 1 | open | /dashboard | 
    driver.get("https://seng-401-on-the-house.web.app/dashboard");
    // 2 | waitForElementPresent | css=.MuiButton-root | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiButton-root")));
    }
    // 3 | assertText | xpath=(//button[@type='button'])[2] | LOGOUT
    assertThat(driver.findElement(By.xpath("(//button[@type=\'button\'])[2]")).getText(), is("LOGOUT"));
    // 4 | click | css=.MuiGrid-root:nth-child(1) .MuiCardMedia-root | 
    driver.findElement(By.cssSelector(".MuiGrid-root:nth-child(1) .MuiCardMedia-root")).click();
    // 5 | waitForElementPresent | css=.MuiTypography-root:nth-child(5) | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiTypography-root:nth-child(5)")));
    }
    // 6 | assertText | css=.MuiTypography-root:nth-child(5) | Ingredients:
    assertThat(driver.findElement(By.cssSelector(".MuiTypography-root:nth-child(5)")).getText(), is("Ingredients:"));
    // 7 | storeText | css=.MuiChip-label | voteCount
    vars.put("voteCount", driver.findElement(By.cssSelector(".MuiChip-label")).getText());
    // 8 | click | css=.MuiCardContent-root > .MuiButtonBase-root:nth-child(1) path | 
    driver.findElement(By.cssSelector(".MuiCardContent-root > .MuiButtonBase-root:nth-child(1) path")).click();
    // 9 | waitForElementPresent | css=.MuiCardContent-root > .MuiButtonBase-root:nth-child(1) | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiCardContent-root > .MuiButtonBase-root:nth-child(1)")));
    }
    // 10 | assertNotText | css=.MuiChip-label | ${voteCount}
    assertThat(driver.findElement(By.cssSelector(".MuiChip-label")).getText(), is(not("vars.get(\"voteCount\").toString()")));
  }
  @Test
  public void testUpvote() {
    // Test name: TestUpvote
    // Step # | name | target | value
    // 1 | open | /dashboard | 
    driver.get("https://seng-401-on-the-house.web.app/dashboard");
    // 2 | waitForElementPresent | css=.MuiButton-root | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiButton-root")));
    }
    // 3 | assertText | xpath=(//button[@type='button'])[2] | LOGOUT
    assertThat(driver.findElement(By.xpath("(//button[@type=\'button\'])[2]")).getText(), is("LOGOUT"));
    // 4 | click | css=.MuiGrid-root:nth-child(1) .MuiCardMedia-root | 
    driver.findElement(By.cssSelector(".MuiGrid-root:nth-child(1) .MuiCardMedia-root")).click();
    // 5 | waitForElementPresent | css=.MuiTypography-root:nth-child(5) | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiTypography-root:nth-child(5)")));
    }
    // 6 | assertText | css=.MuiTypography-root:nth-child(5) | Ingredients:
    assertThat(driver.findElement(By.cssSelector(".MuiTypography-root:nth-child(5)")).getText(), is("Ingredients:"));
    // 7 | storeText | css=.MuiChip-label | voteCount
    vars.put("voteCount", driver.findElement(By.cssSelector(".MuiChip-label")).getText());
    // 8 | click | css=.MuiButtonBase-root:nth-child(3) path | 
    driver.findElement(By.cssSelector(".MuiButtonBase-root:nth-child(3) path")).click();
    // 9 | waitForElementPresent | css=.MuiButtonBase-root:nth-child(3) > .MuiSvgIcon-root | 30000
    {
      WebDriverWait wait = new WebDriverWait(driver, 30);
      wait.until(ExpectedConditions.presenceOfElementLocated(By.cssSelector(".MuiButtonBase-root:nth-child(3) > .MuiSvgIcon-root")));
    }
    // 10 | assertNotText | css=.MuiChip-label | ${voteCount}
    assertThat(driver.findElement(By.cssSelector(".MuiChip-label")).getText(), is(not("vars.get(\"voteCount\").toString()")));
  }
}
